let emotions = require("./emotions.json");
let emotionObj = {};
emotions.forEach(e => {
  emotionObj[e.value] = e.value;
});
let Mock = require("mockjs");
let Random = Mock.Random;

module.exports = function() {
  var data = {
    news: []
  };

  var images = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(x =>
    Random.image("200x100", Random.color(), Random.word(2, 6))
  );

  for (var i = 0; i < 1000; i++) {
    data.news.push({
      id: i,
      timestamp: Date.now() + i,
      title: Random.cword(8, 20),
      desc: buildContent(),
      tag: Random.cword(2, 6),
      views: Random.integer(100, 5000),
      images: images.slice(0, Random.integer(1, 9))
    });
  }

  return data;
};

// 构建新闻内容
function buildContent() {
  // 随机生成 3-10个句子
  var content = Random.cparagraph(3, 10);
  // 截取100个以内字符
  content = content.substr(0, 100);
  var mock = Mock.mock({
    "emotion|0-5": emotionObj,
    link: "@url",
    "topic|1": [
      "#话题一#",
      "#话题二#",
      "#话题三#",
      "#话题四#",
      "#话题五#",
      "#话题六#"
    ]
  });
  content =
    mock.topic +
    content +
    Object.keys(mock.emotion)
      .map(e => e.key)
      .join() +
    mock.link;
  return content;
}
