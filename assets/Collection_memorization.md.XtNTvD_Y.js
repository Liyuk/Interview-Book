import{_ as n,o as s,c as p,a3 as e}from"./chunks/framework.DjfA6S92.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Collection/memorization.md","filePath":"Collection/memorization.md"}'),i={name:"Collection/memorization.md"};function l(t,a,c,o,r,d){return s(),p("div",null,[...a[0]||(a[0]=[e(`<h2 id="q-函数记忆是什么-什么场景下使用-动态规划" tabindex="-1">Q: 函数记忆是什么？什么场景下使用？（动态规划） <a class="header-anchor" href="#q-函数记忆是什么-什么场景下使用-动态规划" aria-label="Permalink to &quot;Q: 函数记忆是什么？什么场景下使用？（动态规划）&quot;">​</a></h2><h2 id="a" tabindex="-1">A： <a class="header-anchor" href="#a" aria-label="Permalink to &quot;A：&quot;">​</a></h2><p>01，将上次计算结果保存起来的函数，称为有记忆能力（memorization）的函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function memorize(f) {</span></span>
<span class="line"><span>    var cache = {}; </span></span>
<span class="line"><span>    return function() {</span></span>
<span class="line"><span>         var key = arguments.length + Array.prototype.join.call(arguments,&quot;,&quot;);</span></span>
<span class="line"><span>         if (key in cache) return cache[key];</span></span>
<span class="line"><span>         else return cache[key] = f.apply(this, arguments);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>01，利用闭包，将结算结果保存在私有的缓存对象里。</li><li>02，将实参长度加实参参数作为缓存对象属性。</li><li>03，如果key属性不存在，就将结果保存在key属性的值。</li></ul><p>下面的代码展示了如何使用memorize()：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 返回两个整数的最大公约数</span></span>
<span class="line"><span>// 使用欧几里德算法:http://en.wikipedia.org/wiki/Euclidean_algorithm</span></span>
<span class="line"><span>function gcd(a,b) {                     // 这里省略对a和b的类型检查</span></span>
<span class="line"><span>    var t;                              // 临时变量用来存储交换数值</span></span>
<span class="line"><span>    if (a &lt; b) t=b, b=a, a=t;           // 确保 a &gt;= b</span></span>
<span class="line"><span>    while(b != 0) t=b, b = a%b, a=t;    // 这是求最大公约数的欧几里德算法</span></span>
<span class="line"><span>    return a;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var gcdmemo = memorize(gcd);</span></span>
<span class="line"><span>gcdmemo(85, 187) // =&gt; 17</span></span></code></pre></div><p>代码分析By魔芋</p><p>var gcdmemo = memorize(gcd);</p><p>f=gcd(a,b);</p><p>第一次调用时，cache为空对象。 gcdmemo为返回的匿名函数。</p><p>key为285,187</p><p>第二次调用时，cache.key已存在，将直接返回计算值。</p><hr><p>应用一：实现记忆功能的递归函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var factorial = memorize(function(n) {  </span></span>
<span class="line"><span>      return (n &lt;= 1) ? 1 : n * factorial(n-1);</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>factorial(5)            // =&gt; 120.对于4~1的值也有缓存</span></span></code></pre></div><p>应用二：数组去重：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>unction unique(arr) {</span></span>
<span class="line"><span>  var ret = []</span></span>
<span class="line"><span>  var hash = {}</span></span>
<span class="line"><span>  for (var i = 0; i &lt; arr.length; i++) {</span></span>
<span class="line"><span>    var item = arr[i]</span></span>
<span class="line"><span>    var key = typeof(item) + item;</span></span>
<span class="line"><span>    if (hash[key] !== 1) {</span></span>
<span class="line"><span>      ret.push(item)</span></span>
<span class="line"><span>      hash[key] = 1</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return ret;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>**</p>`,19)])])}const u=n(i,[["render",l]]);export{m as __pageData,u as default};
