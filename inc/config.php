<?php

/* !
 * Copyright (c) 2012 Lincong All rights reserved.
 * Mail lincong1987@gmail.com
 * QQ 159257119
 * This software is the confidential and proprietary information of Lincong,
 * Inc. ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the license
 * agreement you entered into with Lincong.
 */
/**
 * 错误报告配置，开发请使用E_ALL, 生产环境建议使用0
 */
//禁用错误报告
error_reporting(0);

//报告运行时错误
//error_reporting(E_ERROR | E_WARNING | E_PARSE);
//报告所有错误
//error_reporting(E_ALL);
//启动会话
session_start();

//设置PHP执行时间为30秒（单位秒）
set_time_limit(30);

//系统版本,改动本配置将会清除js、css等资源缓存
$version = "1.0.0.4";

// 开发者模式配置
$debug = true;

// 使用SEA数据库配置
$sinaAppEngine = false;

/**
 * 数据库相关配置
 * @author Lincong <lincong1987@gmail.com>
 * @date 2013-1-29 16:33:43
 */
$db_type = 'mysql'; //mysql表示Mysql库
$db_host = '192.168.1.205:3306';
$db_user = 'hx_exam'; //数据库用户名
$db_pass = '86617786'; //数据库密码
$db_name = 'westsoft'; //数据库名
$db_charset = 'utf8'; //编码
///////////////////请不要改动以下代码/////////////////////////

if ($sinaAppEngine == true) {
    $db_host = SAE_MYSQL_HOST_M . ":" . SAE_MYSQL_PORT;
    $db_user = SAE_MYSQL_USER; //数据库用户名
    $db_pass = SAE_MYSQL_PASS; //数据库密码
    $db_name = SAE_MYSQL_DB; //数据库名
}

/**
  用户名　 :  SAE_MYSQL_USER
  密　　码 :  SAE_MYSQL_PASS
  主库域名 :  SAE_MYSQL_HOST_M
  从库域名 :  SAE_MYSQL_HOST_S
  端　　口 :  SAE_MYSQL_PORT
  数据库名 :  SAE_MYSQL_DB
 */
// SEO 相关
$web_description = "Mr.L, design";
$web_keywords = "Mr.L, design";


define('Q_VERSION', $version);

define('Q_DEBUG', $debug);

define('Q_DB_TYPE', $db_type);
define('Q_DB_HOST', $db_host);
define('Q_DB_USER', $db_user);
define('Q_DB_PASS', $db_pass);
define('Q_DB_NAME', $db_name);
define('Q_DB_CHARSET', $db_charset);

define('Q_WEB_DESCRIPTION', $web_description);
define('Q_WEB_KEYWORDS', $web_keywords);

define('WEB_HOST', 'http://' . $_SERVER['HTTP_HOST'] . '/');
define('APP_PATH', WEB_HOST . 'app');
define('RE_PATH', WEB_HOST . 're');

define('APP_SEAL_PATH', WEB_HOST . 'app_seal');
define('APP_SEAL_IMG_PATH', WEB_HOST . 'app_seal/uploadSeals');

define('Q_ROOT', dirname(__FILE__) . '/../');
define('Q_BASE_CACHE', Q_ROOT . '/cache/');
define('Q_SMS_ROOT', Q_ROOT . '/sms/');
define('Q_SMS_CACHE', Q_SMS_ROOT . 'cache/');
define('Q_RE_ROOT', Q_ROOT . '/re/');
define('Q_FWD_ROOT', Q_ROOT . '/fwd/');
define('Q_BASE_SETTINGS', Q_BASE_CACHE . 'settings.php');


//用户列表的配置
$userListConfig = array();
$userListConfig['freshTime'] = 120;           //秒
//$userListConfig['freshTime'] = 120;           //秒
//JKB配置
$jkbConfig = array(
    "phpCacheFileName" => "/JKBcacheFile.php",
    "phpCacheFile" => Q_BASE_CACHE . "/JKBcacheFile.php",
    "phpCacheTime" => 1800,
    "jsonCacheFileName" => "/JKBcacheFile.json",
    "jsonCacheFile" => Q_BASE_CACHE . "/JKBcacheFile.json",
    "jsonCacheTime" => 1800
);


//客服系统路径
$kefu = array();
$kefu["root"] = "202.75.221.24:8080";
$kefu["ssl"] = "202.75.221.19:4448";


$SYSTEM = array(
    "WEB_HOST" => WEB_HOST,
    "NAME" => "远程平台",
    "VERSION" => $version,
    "SERVER" => "",
    "KF" => $kefu
);
$_SESSION["version"] = $SYSTEM['VERSION'];
//defined(SYSTEM, $SYSTEM);

$dbConfig = array(
    'id' => "kefu_oci_1",
    'driver' => 'oracle',
    'host' => '',
    'port' => "",
    'login' => 'ICINFO',
    'password' => 'hx_icinfo',
    'database' => '',
    'persistent' => false
);

//
$sysCacheConfig = array(
    "sysConfigFileName" => "sysConfig.php",
    "sysConfigFile" => Q_BASE_CACHE . "/sysConfig.php",
    "sysConfigFileTime" => 3600,
    "getNavFileName" => "getNav.php",
    "getNavFile" => Q_BASE_CACHE . "/getNav.php",
    "getNavFileTime" => 3600,
    "getUserRoleFileName" => "getUserRole.php",
    "getUserRoleFile" => Q_BASE_CACHE . "/getUserRole.php",
    "getUserRoleFileTime" => 3600,
    "getUserGroupFileName" => "getUserGroup.php",
    "getUserGroupFile" => Q_BASE_CACHE . "/getUserGroup.php",
    "getUserGroupFileTime" => 3600,
    "user_getAllFileName" => "user_getAll.php",
    "user_getAllFile" => Q_BASE_CACHE . "/user_getAll.php",
    "user_getAllFileTime" => 3600,
    "favoritesCacheFileName" => "favoritesCache.php",
    "favoritesCacheFile" => Q_BASE_CACHE . "/favoritesCache.php",
    "favoritesCacheFileTime" => 3600,
    "favoritesGroupCacheFileName" => "favoritesGroupCache.php",
    "favoritesGroupCacheFile" => Q_BASE_CACHE . "/favoritesGroupCache.php",
    "favoritesGroupCacheFileTime" => 3600,
);

$interface = array(
    "NT_interface" => RE_PATH . "app/NT_interface.php",
    "KF_interface" => RE_PATH . "/KF_interface.php",
    "ATG_interface" => RE_PATH . "/ATG_interface.php",
    "user_api" => WEB_HOST . "user_api.php"
);
?>
