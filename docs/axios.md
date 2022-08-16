# axios 封装

### question
1. **竞态问题**
2. ...

### 竞态问题
#### 参考文献
1. [如何解决前端常见的竞态问题](https://juejin.cn/post/7128205011019890695)

#### 问题介绍

**竞态问题**，又叫**竞态条件**（race condition），它旨在描述一个系统或者进程的输出依赖于不受控制的事件出现顺序或者出现时机。

简单来说，竞态问题出现的原因是无法保证异步操作的完成会按照他们开始时同样的顺序。举个🌰：

- 有一个分页列表，快速地切换第二页，第三页；
- 先后请求 data2 与data3，分页器显示当前在第三页，并且进入 loading；
- 但由于网络的不确定性，先发出的请求不一定先响应，所以有可能 data3 比 data2 先返回；
- 在 data2 最终返回后，分页器指示当前在第三页，但展示的是第二页的数据。

这就是竞态条件，在前端开发中，常见于搜索，分页，选项卡等切换的场景。

#### axios解决


```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Axios 取消重复请求示例</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/qs/6.9.6/qs.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
  </head>
  <body>
    <h3>Axios 取消重复请求示例</h3>
    <button onclick="sendRequest()">发起请求</button>
    <script>
      const pendingRequest = new Map();

      function generateReqKey(config) {
        const { method, url, params, data } = config;
        return [method, url, Qs.stringify(params), Qs.stringify(data)].join(
          "&"
        );
      }

      function addPendingRequest(config) {
        const requestKey = generateReqKey(config);
        config.cancelToken =
          config.cancelToken ||
          new axios.CancelToken((cancel) => {
            if (!pendingRequest.has(requestKey)) {
              pendingRequest.set(requestKey, cancel);
            }
          });
      }

      function removePendingRequest(config) {
        const requestKey = generateReqKey(config);
        if (pendingRequest.has(requestKey)) {
          const cancel = pendingRequest.get(requestKey);
          cancel(requestKey);
          pendingRequest.delete(requestKey);
        }
      }

      axios.interceptors.request.use(
        function (config) {
          removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
          addPendingRequest(config); // 把当前请求添加到pendingRequest对象中
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        (response) => {
          removePendingRequest(response.config); // 从pendingRequest对象中移除请求
          return response;
        },
        (error) => {
          removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
          if (axios.isCancel(error)) {
            console.log("已取消的重复请求：" + error.message);
          } else {
            // 添加异常处理
          }
          return Promise.reject(error);
        }
      );

      async function sendRequest() {
        console.dir(pendingRequest);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/1"
          //   "https://localhost:3000/todos/1"
        );
        console.log(response.data);
      }
    </script>
  </body>
</html>
```