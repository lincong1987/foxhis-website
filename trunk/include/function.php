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
include ("./inc/config.php");


try {
    //连接服务器,数据库
    $conn = mysql_connect(Q_DB_HOST, Q_DB_USER, Q_DB_PASS) or error("Can Not Connect MySQL Server ".Q_DB_HOST.".".getMysqlError());
    mysql_select_db(Q_DB_NAME, $conn) or error("Can Not Connect Database ".Q_DB_NAME.".".getMysqlError());
} catch (Exception $exc) {
    echo $exc->getTraceAsString();

}

function getMysqlError(){
    return Q == false ? "" : mysql_error();
}


///////////////////////////////////////
//输出友好的错误信息
///////////////////////////////////////
function error($str = "", $id = "", $type = "html", $show = "die") {
    $t = date("Y-m-d H:i:s", time());
    $str = !empty($str) ? $str : "Unknow Error";
    //@error_log($str, 0, "");
    $ROOT = "http://" . $_SERVER["HTTP_HOST"] . "/ErrList.php?ERR_ID={$id}";
    $json_err_id = $id;
    $id = empty($id) ? "" : "<br><b>Err_id:</b><a target='_blank' style='font-size:12px; color:#357dce' href='{$ROOT}'>{$id}</a>";
    if ($type == "html") {
        if ($show == "echo") {
            echo("<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head><body><div style='font-family:Verdana;background:url(http://" . $_SERVER["HTTP_HOST"] . "/src/img/icon_error.gif) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px;font-size:12px; border:1px solid #8cb7d7; margin:10px; color:#369'><br><b>Error:</b>{$str}{$id}<br><b>Time:{$t}</b></div></body></html></body>");
            return;
        } elseif ($show == "button") {
            die("<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head><body><div style='font-family:Verdana;background:url(http://" . $_SERVER["HTTP_HOST"] . "/src/img/icon_error.gif) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px;font-size:12px; border:1px solid #8cb7d7; margin:10px; color:#369'><br><b>Error:</b>{$str}{$id}<br><b>Time:{$t}</b><br><input type='button' onclick='window.close();' value='关闭'></div></body></html></body>");
            return;
        } else {
            die("<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head><body><div style='font-family:Verdana;background:url(http://" . $_SERVER["HTTP_HOST"] . "/src/img/icon_error.gif) #F6FBFF no-repeat 0px 0px; height:117px; overflow-x: hidden; overflow-y: auto; width:550px; padding-left:140px; font-size:12px; border:1px solid #8cb7d7; margin:10px; color:#369'><br><b>Error:</b>{$str}{$id}<br><b>Time:</b>{$t}</div></body></html>");
        }
    }
    if ($type == "json") {
        $ROOT = empty($json_err_id) ? "" : "<br>for the error, visit <a href='http://{$_SERVER["HTTP_HOST"]}/ErrList.php?ERR_ID={$json_err_id}' style='display:block;font-size:12px; ' target='_blank'>this -> {$json_err_id}</a>";
        jsonError("fail", $str . "{$ROOT}<BR>@" . $t, $json_err_id);
    }

    if ($show == "echo") {
        echo($str . " " . $id . " @" . $t);
    } elseif ($show == "asasdasdasda") {

    } else {
        die($str . " " . $id . " @" . $t);
    }
}

//////////////////////////////////////////
//jsonError
//////////////////////////////////////////
function jsonError($state = "undefined", $msg = "undefined", $error = "undefined", $type = 'json') {

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

?>
