import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const apiUrl = 'https://vue3-course-api.hexschool.io';
    const token = '';
    const user = ref({
      username: '',
      password: '',
    });

    // 1. 先執行 login
    // 2. 取得 token 後儲存到 browser cookie

    const signIn = async () => {
      try {
        const res = await axios.post(`${apiUrl}/v2/admin/signin`, user.value);

        const { expired, token } = res.data;
        // 儲存 token 在 cookie
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        // 跳轉頁面
        window.location = 'products.html';
      } catch (error) {
        alert(error.data.message);
      }
    };
    const onSubmit = () => {
      signIn();
    };
    return {
      user,
      onSubmit,
    };
  },
}).mount('#app');
