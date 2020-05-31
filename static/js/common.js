/* eslint-disable */
function scrollFunction () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('lqsblog-top').style.display = 'block';
  } else {
    document.getElementById('lqsblog-top').style.display = 'none';
  }
};

// 点击按钮，返回顶部

function topFunction () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// 当网页向下滑动 20px 出现"返回顶部" 按钮
window.onscroll = function () {
  scrollFunction();
}
