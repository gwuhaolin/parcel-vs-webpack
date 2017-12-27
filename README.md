# Parcel Vs Webpack
> 爱折腾的前端圈时常会有新轮子诞生，只要是好东西就能快速获得大量关注，资历再好的大哥只要不如新人也很快会被替代。

横空出世的[Parcel](https://parceljs.org/)近日成为了前端圈的又一大热点，在短短几周内就获得了13K的Star。
作为前端构建工具新人的Parcel为什么能在短期内获得这么多赞同？他和老大哥Webpack比起来到底有什么优势呢？

我花了6个月的时间写了一本全面介绍Webpack的图书[《深入浅出 Webpack》](http://webpack.wuhaolin.cn/)近日刚出版，感觉被新出的Parcel给腰斩了。
但本文将本着公平公正的心态来详细对比一下他两，让你能明白他们直接的异同和优缺点对比，好决定是选Parcel还是Webpack。

为了对比他两，我们从实际出发举一个实战项目为例子，分别用Parcel和Webpack去实现，实战项目要求如下：

- 项目采用TypeScript+React+SCSS；
- 项目采用了[Antd](https://ant.design) UI组件库，但要做到按需加载只用到了的组件，而不是所有组件都打包进去；
- 项目使用了[Lodash](https://lodash.com)库，用于检查构建是否有剔除无用代码的能力(TreeShaking)；
- 构建需要支持模块热替换功能，以提高开发效率；
- 支持SourceMap，以方便调试；
- 对比他们的首次启动速度和监听变化时的构建速度；
- 在生成环境下需要压缩JS、CSS，CSS需要提取到单独到文件，并对比他们在生产环境下构建出文件大小；
- 需要生成自动会加载对应资源的HTML文件；


### Parcel让人眼前一亮
在用了很久Webpack后用Parcel的感觉就像用了很久Android机后用iPhone，不用再去操心细节和配置，大多数时候Parcel刚刚够用而且用的很舒服。

用Parcel去完成以上项目的要求，我只是专心去写项目页面所必须的代码，Parcel智能快速的帮我构建出了能正常运行的结果。

以下是Parcel让我心动的点：
- Parcel能做到无配置完成以上项目构建要求；
- Parcel内置了常见场景的构建方案及其依赖，无需再安装各种依赖；
- Parcel能以HTML为入口，自动检测和打包依赖资源；
- Parcel默认支持模块热替换，真正的开箱即用；

而反观Webpack，比Parcel要麻烦很多：
- 需要写[一堆配置](https://github.com/gwuhaolin/parcel-vs-webpack/blob/master/webpack.config.js)；
- 需要再安装[一堆依赖](https://github.com/gwuhaolin/parcel-vs-webpack/blob/master/package.json)；
- 不能简单的自动生成HTML；

这个项目我用Parcel时花在构建配置上的时间不到一分钟，而用Webpack构建时花了5分钟去配置。

### Parcel还需要时间去打磨
通过以上项目实践，发现Parcel目前有如下明显的缺点：

- **不支持SourceMap**：在开发模式下，Parcel也不会输出SourceMap，目前只能去调试可读性极低的代码；
- **不支持剔除无效代码(TreeShaking)**：很多时候我们只用到了库中的一个函数，结果Parcel把整个库都打包了进来；
- **一些依赖会让Parcel出错**：当你的项目依赖了一些Npm上的模块时，有些Npm模块会让Parcel运行错误；


### Parcel需要为零配置付出代价
零配置其实是把各种常见的场景做为默认值来实现的，这虽然能节省很多工作量，快速上手，但这同时会带来一些问题：

- **不守规矩的node_module**：有些依赖的库在发布到Npm上时可能不小心把`.babelrc` `postcss.config.js` `tsconfig.json`这些配置文件也一起发布上去了，
由于目前Parcel只要在目录中发现这些配置文件就会认为该项目中的代码需要被处理。例如mini-store这个库中就把`.babelrc`文件发布到了Npm上，项目依赖的本来是lib中已经编译成了ES5的JS代码了，但Parcel还会去用Babel处理一遍。
Npm官方并没有规定发布到Npm上的包需要符合哪些规范，这会让Parcel很为难。
- **不灵活的配置**：零配置的Parcel关闭了很多配置项，在一些需要的配置的场景下无法改变。例如：
    - 无法控制对部分文件的特殊处理，以实现诸如按需加载这样的需求；
    - 无法控制[输出文件名的Hash值和名称](http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-2Output.html)；
    - 无法控制构建输出目录结构；
    - 无法[映射路径以缩短导入语句](http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-4Resolve.html)；
    - HTTP开发服务器不支持[HistoryApi](http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-6DevServer.html)；

### Parcel使用场景受限
目前Parcel**只能用来构建用于运行在浏览器中的网页**，这也是他的出发点和专注点。
在软件行业不可能存在即使用简单又可以适应各种场景的方案，就算所谓的人工智能也许能解决这个问题，但人工智能不能保证100%的正确性。

反观Webpack除了用于构建网页，还可以做：

- [打包发布到Npm上的库](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-13%E6%9E%84%E5%BB%BANpm%E6%A8%A1%E5%9D%97.html)
- [构建Node.js应用(同构应用)](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-11%E6%9E%84%E5%BB%BA%E5%90%8C%E6%9E%84%E5%BA%94%E7%94%A8.html)
- [构建Electron应用](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-12%E6%9E%84%E5%BB%BAElectron%E5%BA%94%E7%94%A8.html)
- [构建离线应用(ServiceWorkers)](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-14%E6%9E%84%E5%BB%BA%E7%A6%BB%E7%BA%BF%E5%BA%94%E7%94%A8.html)

### 构建速度和输出文件大小对比
分别去用Parcel和Webpack构建以上项目，收集的数据如下：

| 数据项 | Parcel | Webpack |
| --- |--- | --- |
| 生成环境构建时间 | 8.310s | 9.58s |
| 开发环境启动时间 | 5.42s | 8.06s |
| 监听变化构建时间 | 3.17s | 2.87s |
| 生成环境输出JS文件大小 | 544K | 274K |
| 生成环境输出CSS文件大小 | 23K | 23K |

从以上数据可以看出：**Parcel构建速度快，但Parcel输出文件大**

导致Parcel构建速度快的原因和iOS比Android用起来更流畅的原因类似：
- Parcel因为一体化内置，所以集成和优化的更好，而Webpack通过插件和Loader机制去让第三方扩展这会拉低性能；
- Parcel内置多进程并行构建，而Webpack默认是单进程构建（[Webpack也支持多进程](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-3%E4%BD%BF%E7%94%A8HappyPack.html)）；

导致Parcel输出JS文件大的原因在于：
- 不支持TreeShaking 
- 构建出的JS中出现了所有文件的名称，如图：
    ![](https://user-images.githubusercontent.com/5773264/34382680-8bd638e0-eb4b-11e7-9edf-9cbdf5c36b93.png)

> 以上[项目完整源码可下载](https://github.com/gwuhaolin/parcel-vs-webpack)

### 总结
现阶段的Parcel就像beta版的iPhone，看上去很美好但还不能用于生成环境，如果你现在就把Parcel用于生成环境，相信我你一定会踩很多坑。
踩坑不要紧，要命的是无法在网上找到解决方法以快速解决问题。

我不是不鼓励大家使用Parcel，历史总需要先驱去推动，就像乔布斯义无反顾的引领了一个时代，我们也需要去实践Parcel，坑都是一个个填平的，所以我鼓励大家在一些个人小项目中使用Parcel。

如果Parcel能解决上面提到的这些问题，我会毫不犹豫的在我的下一个项目中使用他。

