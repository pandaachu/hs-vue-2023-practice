import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const apiUrl = 'https://vue3-course-api.hexschool.io';
    const path = 'pandaachu';
    // const token = '';
    // const uid = '';
    const user = ref({
      username: '',
      password: '',
    });

    const signIn = () => {
      console.log('Sign In');
      // const config = {
      //   headers: { Authorization: token },
      // };
      axios
        .post(`${apiUrl}/v2/admin/signin`, user.value)
        .then(res => {
          console.log(res.data);
          const { expired, token } = res.data;
          // 儲存 token 在 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        })
        .catch(error => {
          console.dir(error);
        });
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
