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


try {
    //连接服务器,数据库
    $conn = mysql_connect(Q_DB_HOST, Q_DB_USER, Q_DB_PASS) or error("Can Not Connect MySQL Server " . Q_DB_HOST . "." . getMysqlError(), "as", json);
    mysql_select_db(Q_DB_NAME, $conn) or error("Can Not Connect Database " . Q_DB_NAME . "." . getMysqlError());
} catch (Exception $exc) {
    echo $exc->getTraceAsString();
}

function getMysqlError() {
    return Q_DEBUG == false ? "" : mysql_error();
}

///////////////////////////////////////
//输出友好的错误信息
///////////////////////////////////////
function error($str = "", $id = "", $type = "html", $show = "die") {

    $debug = debug_backtrace();
    //print_r($debug);

    if (Q_DEBUG == true) {
        $d = $debug[0];
        $d = array(
            "file" => $debug["file"],
            "line" => $debug["line"],
            "function" => $debug["function"],
            "args" => $debug["args"]
        );
        $_d = "trace:
			<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>[file:]</b>{$d["file"]}
			<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>[line:]</b>{$d["line"]}
			<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>[function:]</b>{$d["function"]}
			";
    }

    $t = date("Y-m-d H:i:s", time());
    $str = !empty($str) ? $str : "Unknow Error";
    $ROOT = "http://" . $_SERVER["HTTP_HOST"] . "/ErrList.php?ERR_ID={$id}";
    $json_err_id = $id;
    $id = empty($id) ? "" : "<br><b>Visit For More:</b><a target='_blank' style='font-size:12px; color:#357dce' href='{$ROOT}'>{$id}</a>";
    if ($type == "html") {
        if ($show == "echo") {
            echo("<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head><body><div style='font-family:Verdana; background:url(http://" . $_SERVER["HTTP_HOST"] . "/src/img/error.gif) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px;font-size:12px; border:1px solid #8cb7d7; margin:10px; color:#369'><br><b>Error:</b>{$str}{$id}<br><b>Time:{$t}</b><br>{$_d}</div></body></html></body>");
            return;
        } elseif ($show == "button") {
            die("<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head><body><div style='font-family:Verdana;background:url(http://" . $_SERVER["HTTP_HOST"] . "/src/img/error.gif) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px;font-size:12px; border:1px solid #8cb7d7; margin:10px; color:#369'><br><b>Error:</b>{$str}{$id}<br><b>Time:{$t}</b><br>{$_d}<br><input type='button' onclick='window.close();' value='关闭'></div></body></html></body>");
            return;
        } else {
            die("<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head><body><div style='font-family:Verdana;background:url(http://" . $_SERVER["HTTP_HOST"] . "/src/img/error.gif) #F6FBFF no-repeat 0px 0px; height:117px; overflow-x: hidden; overflow-y: auto; width:550px; padding-left:140px; font-size:12px; border:1px solid #8cb7d7; margin:10px; color:#369'><br><b>Error:</b>{$str}{$id}<br><b>Time:</b>{$t}<br>{$_d}</div></body></html>");
        }
    }
    if ($type == "json") {
        $ROOT = empty($json_err_id) ? "" : "for the error, visit <a href='http://{$_SERVER["HTTP_HOST"]}/ErrList.php?ERR_ID={$json_err_id}' style='display:block;font-size:12px; ' target='_blank'>this -> {$json_err_id}</a>";
        jsonError("fail", $str . "{$ROOT} @" . $t, $debug);
    }

    if ($show == "echo") {
        echo($str . " " . $id . " @" . $t . $_d);
    } elseif ($show == "asasdasdasda") {

    } else {
        die($str . " " . $id . " @" . $t);
    }
}

/**
 * 输出json
 *
 * @param string $state
 * @param string $msg
 * @param string $error
 * @param string $type
 * @return string | json
 * @author Lincong lincong1987@gmail.com
 * @copyright (c) 2013, Lincong
 */
function jsonEncode($state = "undefined", $msg = "undefined", $error = "undefined", $type = 'json') {

    $tmp = array("state" => $state, "msg" => $msg, "error" => $error);
    switch ($type) {
        case "easyui" :
            $tmp = array("rows" => $msg, "total" => $state, "debug" => $error);
            header('Content-type: application/json; charset=UTF-8');
            die(json_encode($tmp));
            exit();
            break;
        case "return" :
            //$tmp = array("state" => $state, "msg" => $msg, "error" => $error);
            return (json_encode($tmp));
            break;
    }
    header('Content-type: application/json; charset=UTF-8');
    $jsoncallback = isset($_GET["jsoncallback"]) ? $_GET["jsoncallback"] : "";
    if (empty($jsoncallback)) {
        die(json_encode($tmp));
    } else {
        die($jsoncallback . "(" . json_encode($tmp) . ")");
    }
}

/**
 * 执行SQL
 *
 * @param string $sql
 * @param string $msg
 * @param string $type
 * @return bolean
 */
function getResult($sql, $msg = "", $type = "html") {
    $msg = !empty($msg) ? $msg : "";
    @mysql_query("set names " . Q_DB_CHARSET);
    $result = mysql_query($sql) or error("getResult Filed<br><span style='font-size:12px; font-family:Verdana;'>{$msg}<br>{$sql}<br>" . getMysqlError() . "<BR>PROJECT_VERSION:" . Q_VERSION . "</span>", $msg, $type);
    return $result;
    @mysql_free_result($result);
}

/**
 * 执行SQL
 *
 * @param string $sql
 * @param string $msg
 * @param string $type
 * @return bolean
 */
function sqlExecute($sql, $msg = "", $type = "html") {
    $msg = empty($msg) ? "" : $msg;
    @mysql_query("set names " . Q_DB_CHARSET);
    $bool = @mysql_query($sql) or error("sqlExecute Filed<br><span style='font-size:12px; font-family:Verdana;'>{$msg}<br>{$sql}<br>" . getMysqlError() . "<BR>PROJECT_VERSION:" . Q_VERSION . "</span>", $msg, $type);
    return $bool;
}

/**
 * 执行SQL
 *
 * @param string $sql
 * @param string $msg
 * @param string $type
 * @return array
 */
function sqlArray($sql, $msg = "", $type = "html") {
    $record = array();
    $result = getResult($sql, "sqlArray Filed,Message:{$msg}", $type);
    while ($tmp_info = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $record[] = $tmp_info;
    }
    return $record;
}

/**
 * 执行SQL
 *
 * @param string $sql
 * @param string $msg
 * @param string $type
 * @param string $countField
 * @return array
 */
function sqlRow($sql, $msg = "", $type = "html") {
    $res = getResult($sql, $msg, $type);
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
}

/**
 * 执行SQL
 *
 * @param string $sql
 * @param string $msg
 * @param string $type
 * @param string $countField
 * @return int
 */
function sqlCount($sql, $msg = "", $type = "html", $countField = '*') {
    $sql = $countField != "" ? @stristr($sql, "select t.* from") == false ? "select count(*) from (" . @str_ireplace("select * from", "select {$countField} from", $sql) . ") as _count_" : "select count(*) from (" . @str_ireplace("select t.* from", "select {$countField} from", $sql) . ") as _count_"  : $sql;
    $res = getResult($sql, $msg, $type);
    $row = @mysql_fetch_row($res);
    return $row[0];
}

function clearHtml($str) {
    $str = trim($str);
    $str = strip_tags($str, "");
    $str = ereg_replace("\t", "", $str);
    $str = ereg_replace("\r\n", "", $str);
    $str = ereg_replace("\r", "", $str);
    $str = ereg_replace("\n", "", $str);
    $str = ereg_replace(" ", " ", $str);
    return trim($str);
}

?>
