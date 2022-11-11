---
title: Cookie SameSite 用法
date: 2022-11-09 13:38:49
tags: HTTP, Cookie
index_img: /assets/christmas-sugar-cookies.jpg
---

Cookie 是一种可用于向网站添加持久性状态的方法。每个 Cookie 都是一对 `key=value`，以及许多控制 Cookie 何时何地使用的属性。你可以使用这些属性设置诸如过期
日期或指定 Cookie 值仅仅可以通过 HTTPS 访问。服务器可以通过在响应头中设置 `Set-Cookie` 头来设置 Cookie。

假设您有一个博客，你想在其中向用户显示"最新消息"的宣传。用户可以选择不看这则宣传，然后在一段时间内，他们就不会再次看到这则宣传。您可以将用户的首选项存储在 cookie 中，
并设置为在一个月（2,600,000 秒）后过期，并且仅通过 HTTPS 发送。该标头如下所示：

```
Set-Cookie: promo_shown=1; Max-Age=2600000; Secure
```

当你的读者查看的页面满足这些要求，即他们处于安全连接上且 Cookie 还不到一个月，那么他们的浏览器将在其请求中发送此标头：

```
Cookie: promo_shown=1
```

你还可以使用 `document.cookie` 在 JavaScript 中添加和读取该网站可用的 Cookie。`document.cookie` 进行赋值将创建或覆盖一个带有该键的 Cookie。例如，你可以在浏览器的 JavaScript 控制台中尝试以下操作：

```
→ document.cookie = "promo_shown=1; Max-Age=2600000; Secure"
← "promo_shown=1; Max-Age=2600000; Secure"
```

读取 `document.cookie` 将输出当前上下文中可访问的所有 Cookie，每个 Cookie 用分号进行分隔：

```
→ document.cookie;
← "promo_shown=1; color_theme=peachpuff; sidebar_loc=left"
```

如果你在所选择的一系列热门网站上尝试此操作，就会注意到大多数网站设置的 Cookie 远不止三个。
在大多数情况下，这些 Cookie 会在每次向该域名发出请求时被发送，这会产生多种影响。对你的用户来说，上传带宽通常比下载更受限，因此，所有出站请求的开销都会使你的首字节时间发生延迟。
请在 Cookie 数量和大小的设置上做到保守。使用 `Max-Age` 属性来帮助确保 Cookie 的停留时间不会超过所需时间

## 第一方和第三方 Cookie

如果再回到你之前查看的那几个网站，可能会注意到不仅仅是你当前访问的域名有 Cookie，许多域名都有 Cookie。
与当前网站的域名（即浏览器地址栏中显示的内容）相匹配的 Cookie 被称为第一方 Cookie。同样，来自当前网站以外域名的 Cookie 被称为第三方 Cookie。
这不是一个绝对的标签，而是相对于用户上下文来决定的。同一个 Cookie 可以是第一方的，也可以是第三方的，具体取决于用户当时所在的网站。

继续上面的例子，假设你的一篇博文中有一张非常独特的照片，而这张照片被托管在/assets/iron_man.png。
因为照片十分令人惊叹，其他人直接在他们的网站上使用了该照片。如果访问者访问过您的博客并拥有 `promo_shown` cookie，那么当他们在其他人的网站上浏览 iron_man.png 时，就会在图像请求中发送该 Cookie。这对任何一方都不是特别有用，
因为 `promo_shown` 在其他人的网站上不用于任何内容，只是增加了请求的开销。

网络的其中一项文化属性就是它在默认情况下往往是开放的。这也是如此多的人得以在网络上创建自己的内容和应用程序的一部分原因。
然而，这也带来了许多安全和隐私问题。跨站请求伪造 (CSRF) 攻击依赖于这样一个事实，即 Cookie 会被附加到一个给定域名的任何请求（无论是谁发起请求）。
例如，如果你访问 `lzbsun.example`，那么它就可以触发对 `blog.example` 的请求，并且你的浏览器会欣然附加相关的 Cookie。如果你的博客对验证这些请求的方式没有多加留心，那么 `lzbsun.example` 可能会触发删除帖子或添加自己的内容等操作。

用户也越来越了解 Cookie 在跟踪他们跨多个站点的活动方面的用途。但直到现在还没有一种方法可以明确地说明你使用 Cookie 的意图。你应该只在第一方上下文中发送 `promo_shown` Cookie，而将应嵌入其他网站的小组件的会话 Cookie 用于在第三方上下文中提供登录状态。

## SameSite

`SameSite` 属性使你能够声明 Cookie 是否应限制为第一方或同站上下文。准确理解此处"站点"的含义将会非常有帮助。这里的站点是域名后缀和域名后缀之前部分的组合。例如， www.lzbsun.top 域名是 lzbsun.top 站点的一部分。

[公共后缀列表](https://publicsuffix.org/) 对这一点进行了定义，因此站点不仅仅是 `.com` 等顶级域名，还包括 `github.io` 等服务。这就使得 `lzbsun.github.io` 和 `example.github.io` 算作独立的站点。

> 如果用户在 `lzbsun.github.io` 上向 `example.github.io` 请求图像，那么这是一个跨站请求。

在 Cookie 上引入 `SameSite` 属性为控制此行为提供了三种不同的方式。你可以选择不指定属性，也可以使用 `Strict` 或 `Lax` 来将 Cookie 的使用限制在同站请求中。

如果您将 `SameSite` 设置为 `Strict` ，你的 Cookie 将仅在第一方上下文中被发送。就用户而言，只有当 Cookie 的站点与浏览器 URL 栏中当前显示的站点相匹配时，才会发送 Cookie。因此，如果 `promo_shown` cookie 设置如下：

```
Set-Cookie: promo_shown=1; SameSite=Strict
```

当用户访问你的网站时，cookie 将按预期与请求一起被发送。
但是，当通过链接进入您的网站时（比如通过另一个网站或通过朋友的电子邮件），在最初的请求中不会发送 cookie。
这在你有与始终处于初始导航之后的功能（例如更改密码或进行购买）相关的 cookie 时是非常好的做法，但对 `promo_shown` 限制太大。如果你的读者通过链接进入网站，那么他们会希望通过发送 cookie 来实现他们的首选项。

这时候就需要通过允许这些顶级导航发送 cookie 来使用 `SameSite=Lax` 。让我们回到上文提到的钢铁侠的文章示例，其中，另一个站点正在引用你的内容。他们直接使用了你的照片并提供了你原始文章的链接。

```
<img src="https://lzbsun.github.io/iron_man.png" />
<p>阅读 <a href="https://lzbsun.github.io/iron_man.html">article</a>.</p>
```

并设置 cookie 为：

```
Set-Cookie: promo_shown=1; SameSite=Lax
```

当读者在另一个人的博客上时，cookie 在浏览器请求 iron_man.png 时不会被发送。
但是，当读者通过链接访问你博客上的 iron_man.html 时，相应请求将包含 cookie。这使得 `Lax` 非常适合用于影响网站显示的 cookie，而 `Strict` 对与用户正在执行的操作相关的 cookie 非常有用。

最后，还可以选择不指定值，而该做法在以前表示隐含地声明您希望在所有上下文中发送 cookie。
通过引入 `SameSite=None` 这个新的值来明确了这一点。这意味着你可以使用 `None` 来显式表示您有意希望在第三方上下文中发送 cookie。

> 如果你提供其他站点使用的服务，例如小组件、嵌入内容、附属程序、广告或跨多个站点登录，那么你应该使用 None 来确保你的意图明确。

## 没有 SameSite 的情况下更改默认行为

虽然 `SameSite` 属性得到广泛支持，但遗憾的是该属性并未被开发者广泛采用。
随处发送 cookie 的默认开放性意味着虽然所有用例都可以正常工作，但却会使用户容易受到 CSRF 和无意信息泄露的影响。为了鼓励开发者声明他们的意图并为用户提供更安全的体验，IETF 的渐进式改善 cookie 提案列出了两大关键变化：

- 没有 `SameSite` 属性的 cookie 将被视为 `SameSite=Lax`。
- 具有 `SameSite=None` 的 cookie 还必须指定 `Secure` ，即这些 cookie 需要一个安全的上下文环境。

## 默认为 SameSite=Lax

属性未设置的时候

```
Set-Cookie: promo_shown=1
```

> 如果你发送的 cookie 没有指定 `SameSite` 属性……

默认行为设置

```
Set-Cookie: promo_shown=1; SameSite=Lax
```

> 浏览器会将该 cookie 视为已指定 `SameSite=Lax`。

虽然这是为了应用更安全的默认值，但理想情况下你应该设置显式的 `SameSite` 属性，而不是依赖浏览器为你应用该属性。这会使你的 cookie 意图明确，并提高在不同浏览器之间获得一致体验的机率。

## SameSite=None 必须是安全的

Rejected

```
Set-Cookie: widget_session=abc123; SameSite=None
```

> 设置一个没有 `Secure` 的 cookie 将被拒绝。

Accepted

```
Set-Cookie: widget_session=abc123; SameSite=None; Secure
```

> 您必须确保将 SameSite=None 与 Secure 属性配对。
