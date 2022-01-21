# 设置编码格式
SET
  NAMES UTF8;

# 如果该数据库已存在，则删除之前的
DROP DATABASE IF EXISTS mineapp;

CREATE DATABASE mineapp CHARSET = UTF8;

# 创建数据库
USE mineapp;

# 进入数据库
/**
 * 首页
 */
# 轮播图
CREATE TABLE ma_index_carousel(
  # 设置主键及自动递增
  icid INT PRIMARY KEY AUTO_INCREMENT,
  href VARCHAR(128)
);

INSERT INTO
  ma_index_carousel(icid, href)
VALUES
  (
    NULL,
    "https://app.biaov.cn/mineapp/images/home/1.png"
  ),
  (
    NULL,
    "https://app.biaov.cn/mineapp/images/home/2.png"
  ),
  (
    NULL,
    "https://app.biaov.cn/mineapp/images/home/3.png"
  );

/**
 * 公共
 */
# 问题详情
CREATE TABLE ma_details_question(
  dqid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),
  createTime DATETIME,
  content TEXT
);

INSERT INTO
  ma_details_question(dqid, title, createTime, content)
VALUES
  (NULL, "我的问题", "2020-4-7 10:32", "这就是我的答案");

# 公告详情
CREATE TABLE ma_details_notice(
  dnid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),
  createTime DATETIME,
  content TEXT
);

INSERT INTO
  ma_details_notice(dnid, title, createTime, content)
VALUES
  (
    NULL,
    "1.0.0版本上线",
    "2020-3-9 10:45:56",
    "恭喜MINEAPP 1.0.0版本上线"
  );

/**
 * 用户
 */
# 用户列表
CREATE TABLE ma_list_user(
  luid INT PRIMARY KEY AUTO_INCREMENT,
  mobile VARCHAR(32),
  # 防止password是关键字
  `password` VARCHAR(64)
);

INSERT INTO
  ma_list_user(luid, mobile, `password`)
VALUES
  (NULL, "15575148487", md5("a123456"));

# 用户详情
CREATE TABLE ma_details_user(
  duid INT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(16),
  avatar VARCHAR(128),
  sex TINYINT,
  signature VARCHAR(64),
  userId INT,
  FOREIGN KEY(userId) REFERENCES ma_list_user(luid)
);

INSERT INTO
  ma_details_user(duid, nickname, avatar, sex, signature, userId)
VALUES
  (
    NULL,
    "风",
    "https://app.biaov.cn/mineapp/images/avatar/1.png",
    1,
    "不一样的人生，不一样的风采！",
    1
  );

# 用户笔记列表详情
CREATE TABLE ma_details_note(
  dnid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),
  createTime DATETIME,
  content TEXT,
  userId INT,
  FOREIGN KEY(userId) REFERENCES ma_list_user(luid)
);

INSERT INTO
  ma_details_note(dnid, title, createTime, content, userId)
VALUES
  (
    NULL,
    "上线问题",
    "2020-3-12 17:58:23",
    "哈哈哈，没有什么问题。",
    1
  );

# 反馈详情
CREATE TABLE ma_details_feedback(
  dfid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),
  createTime DATETIME,
  content VARCHAR(128),
  reply VARCHAR(128),
  userId INT,
  FOREIGN KEY(userId) REFERENCES ma_list_user(luid)
);

INSERT INTO
  ma_details_feedback(dfid, title, createTime, content, reply, userId)
VALUES
  (
    NULL,
    "我的测试",
    "2020-3-31 15:45",
    "测试提交内容",
    "测试回复内容",
    1
  );

/**
 * 特效专区
 */
# 特效列表
CREATE TABLE ma_list_special(
  lsid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),
  src VARCHAR(128),
  createTime DATETIME,
  href VARCHAR(128)
);

INSERT INTO
  ma_list_special(lsid, title, src, createTime, href)
VALUES
  (
    NULL,
    "粒子特效",
    "http://app.biaov.cn/mineapp/images/special/1.png",
    "2020-3-13 9:20",
    "http://special.biaov.cn/007"
  );

/**
 * 文章特区
 */
# 文章列表详情
CREATE TABLE ma_details_article(
  daid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),
  src VARCHAR(128),
  createTime DATETIME,
  content TEXT
);

INSERT INTO
  ma_details_article(daid, title, src, createTime, content)
VALUES
  (
    NULL,
    "关于上线的一些事",
    "http://app.biaov.cn/mineapp/images/article/1.png",
    "2019-3-13 9:33",
    "在上线过程中遇到了很多的事情，但都被我一一克服。"
  );

/*
 * 功能模块
 */
# 图片预览列表
CREATE TABLE ma_list_picture(
  lpid INT PRIMARY KEY AUTO_INCREMENT,
  src VARCHAR(128)
);

INSERT INTO
  ma_list_picture(lpid, src)
VALUES
  (
    NULL,
    "https://app.biaov.cn/mineapp/images/picture/1.png"
  );

/*
 * MINEAPP信息
 */
# 信息表
CREATE TABLE ma_details_mineapp(
  dmid INT PRIMARY KEY AUTO_INCREMENT,
  # 防止 version 是关键字
  `version` VARCHAR(16),
  downUrl VARCHAR(64)
);

INSERT INTO
  ma_details_mineapp(dmid, `version`, downUrl)
VALUES
  (
    NULL,
    "1.0.1",
    "http://app.biaov.cn/mineapp/update/update.wgt"
  );