fetch('https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json').then(res => {
  return res.json();
}).then(res => {
  if (res.status === 'success') {
    document.querySelector('#container').innerHTML = res.data;
  }
}).catch(err => {
  console.log(err);
});
