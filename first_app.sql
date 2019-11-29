/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : first_app

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-11-29 14:11:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `real_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `phone` (`phone`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', null, '麦克雷', null, '123', '组长', '2019-11-20 14:09:26', '13951883333', '1');
INSERT INTO `user` VALUES ('5', null, '刘能', null, '123', '社长', '2019-12-01 13:13:13', '15799966641', '2');
INSERT INTO `user` VALUES ('6', null, '刘能', null, '123', '社长', '2019-11-21 10:21:29', '15799926641', '2');
INSERT INTO `user` VALUES ('7', null, '德玛西亚', null, '123', '班长', '2019-11-21 13:42:10', '19865555555', null);
INSERT INTO `user` VALUES ('8', null, '德玛西2亚', null, '123', '班长', '2019-11-21 13:50:53', '19865555525', null);
INSERT INTO `user` VALUES ('9', '安井', '安特鲁', null, '123', '组员', '2019-11-21 15:23:48', '19861255525', null);
INSERT INTO `user` VALUES ('11', '安井', '安特鲁', null, '123', '组员', '2019-11-21 16:47:55', '19861251525', null);
INSERT INTO `user` VALUES ('13', '安井', '安特鲁', null, '123', '组员', '2019-11-21 16:48:22', '19861231525', null);
INSERT INTO `user` VALUES ('14', '安井', '安特鲁', null, '123', '组员', '2019-11-21 16:48:31', '19861131525', null);
INSERT INTO `user` VALUES ('16', '安井', '逮虾户', null, '123', '逮', '2019-11-27 09:04:22', '19861154525', null);
INSERT INTO `user` VALUES ('17', '拓海', '逮虾户', null, '123', '逮', '2019-11-27 13:10:18', '19861124525', null);

-- ----------------------------
-- Table structure for user_auths
-- ----------------------------
DROP TABLE IF EXISTS `user_auths`;
CREATE TABLE `user_auths` (
  `auth_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nictname` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`auth_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_auths
-- ----------------------------

-- ----------------------------
-- Table structure for wares_info
-- ----------------------------
DROP TABLE IF EXISTS `wares_info`;
CREATE TABLE `wares_info` (
  `warse_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品标识',
  `wares_name` varchar(128) NOT NULL COMMENT '商品名',
  `wares_type` int(11) NOT NULL,
  `wares_info` varchar(255) DEFAULT NULL,
  `buy_price` decimal(10,2) NOT NULL COMMENT '成本价',
  `sell_price` decimal(10,2) NOT NULL COMMENT '单价',
  `discount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`warse_id`),
  KEY `wares_type` (`wares_type`),
  CONSTRAINT `wares_info_ibfk_1` FOREIGN KEY (`wares_type`) REFERENCES `wares_type` (`type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wares_info
-- ----------------------------

-- ----------------------------
-- Table structure for wares_pic
-- ----------------------------
DROP TABLE IF EXISTS `wares_pic`;
CREATE TABLE `wares_pic` (
  `pic_id` int(11) NOT NULL AUTO_INCREMENT,
  `wares_id` int(11) NOT NULL COMMENT '所属商品标识，和Wares_info.wares_id关联',
  `pic_address` varchar(255) NOT NULL COMMENT '图片路径',
  PRIMARY KEY (`pic_id`),
  KEY `wares_id` (`wares_id`),
  CONSTRAINT `wares_pic_ibfk_1` FOREIGN KEY (`wares_id`) REFERENCES `wares_info` (`warse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wares_pic
-- ----------------------------

-- ----------------------------
-- Table structure for wares_type
-- ----------------------------
DROP TABLE IF EXISTS `wares_type`;
CREATE TABLE `wares_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(64) NOT NULL COMMENT '类型名称，不允许重复',
  `parent_id` int(64) DEFAULT NULL COMMENT '该类别的父类别标识，如果是顶节点的话设定为某个唯一值',
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_name` (`type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wares_type
-- ----------------------------
INSERT INTO `wares_type` VALUES ('1', '1级', null);
INSERT INTO `wares_type` VALUES ('2', '修改名字2', null);
INSERT INTO `wares_type` VALUES ('3', '2级1', '1');
INSERT INTO `wares_type` VALUES ('4', '2级2', '1');
INSERT INTO `wares_type` VALUES ('5', '类别3', null);
INSERT INTO `wares_type` VALUES ('6', '三级1', '2');
INSERT INTO `wares_type` VALUES ('7', '三级3', '2');
INSERT INTO `wares_type` VALUES ('8', '类别2', null);
INSERT INTO `wares_type` VALUES ('9', '三级2', '2');
