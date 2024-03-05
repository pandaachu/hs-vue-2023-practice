import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
    const apiPath = 'pandaachu';
    
    const products = ref([]);
    const temProduct = ref([]);

    // 1.判斷是否登入
    // 2.取得商品列表
    // 3.取得單個商品資料

    const checkLogin = () => {
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then((res) => {
          if (res.data.success) {
            alert('您已登入');
            getProductList()
            return
          }
          debugger
          window.location = 'index.html';
        })
        .catch((err) => {
          alert(err.message);
          window.location = 'index.html';
        });
    }

    const getProductList = () => {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          products.value = res.data.products;
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    const getToken = () => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
    };

    const getProductDetail = (item) => {
      temProduct.value = item;
    }

    onMounted(() => {
      getToken();
      checkLogin()
    });

    return {
      products,
      temProduct,
      getProductDetail
    };
  },
}).mount('#app');
