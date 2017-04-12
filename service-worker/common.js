fetch('http://www.w3school.com.cn/jquery/test1.txt').fetch(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
