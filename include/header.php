<?php
/*
 *  Copyright (c) 2012 Lincong All rights reserved.
 *  Mail lincong1987@gmail.com
 *  QQ 159257119
 *  This software is the confidential and proprietary information of Lincong,
 *  Inc. ("Confidential Information"). You shall not disclose such Confidential
 *  Information and shall use it only in accordance with the terms of the license
 *  agreement you entered into with Lincong.
 */
?>
<style>
    #modal-header-warp {
        height: 78px;
    }
    #modal-header-logo {
        padding-top: 18px;
        height: 45px;
        width: 105px;
        float: left;
    }
    #modal-header-logo-link {
        height: 45px;
        width: 105px;
        display: block;
    }
    #modal-header-logo-link:hover {

    }
    #modal-header-logo-image {
        height: 45px;
        width: 105px;
        border: 0;
    }

    #modal-header-actions {
        float: right;
        padding-top: 18px;
        padding-right: 10px;
    }

    #top-nav-warp {
        height: 30px;
        overflow: hidden;
    }
    .top-nav {
        padding-left: 139px;
    }
    .top-nav-container {

    }
    .top-nav-tab {
        display: block;
        width: 93px;
        height: 32px;
        float: left;
        border-right: 1px solid #ccc;
    }
    .top-nav-tab h3 {
        width: 93px;
        height: 32px;
    }
    .top-nav-link {
        display: block;
        width: 93px;
        height: 32px;
        text-align: center;
        text-decoration: none;
        background: #FFFFFF;
        padding-top: 5px;
        overflow: hidden;
    }
    .top-nav-link:hover, .top-nav-link-hover {
        background: #9cbdb2;
    }
    .top-nav-link span {
        font-size: 12px;
        color: #595757;
    }
    .top-nav-link:hover span, .top-nav-link-hover span {
        color: #FFFFFF;
    }

    .top-nav-sub {
        visibility: hidden;
        position: absolute;
        z-index: 999;
        zoom: 1;
        width: 103px;
        padding-top: 10px;
        margin-left: -3px;
        opacity: 0.7;
        filter: opacity(alpha=70);
        background: transparent;
    }
    .top-nav-sub li {
    }
    .top-nav-sub li a {
        font-size: 12px;
        padding-top: 4px;
        height: 22px;
        display: block;
        color: #595757;
        background: #FFFFFF;
        margin-bottom: 1px;
        text-decoration: none;
        text-align: center;
    }
    .top-nav-sub li a:hover {
        color: #FFFFFF;
        background: #9cbdb2;
    }
</style>
<div class="modal-header">
    <div class="container">
        <div id="modal-header-warp" class="clearfix">
            <div id="modal-header-logo">
                <a id="modal-header-logo-link" href="<?php echo WEB_HOST; ?>index.php"><img id="modal-header-logo-image" src="images/common/logo_image.png1" alt="西软" title="西软"  /></a>
            </div>
            <div id="modal-header-actions">
                <wb:follow-button uid="1171700494" type="red_1" width="67" height="24" ></wb:follow-button>
            </div>
        </div>

        <div id="top-nav-warp clearfix">
            <div class="top-nav">
                <ul class="top-nav-container">
                    <li class="top-nav-tab">
                        <h3><a href="<?php echo WEB_HOST; ?>index.php" class="top-nav-link" target="_self"><span>首页</span></a></h3>
                    </li>
                    <li class="top-nav-tab">
                        <h3><a href="<?php echo WEB_HOST; ?>index.php" class="top-nav-link" target="_self"><span>关于我们</span></a></h3>
                        <ul class="top-nav-sub clearfix">
                            <li><a href="biz/about/introduction.php" target="_self">西软简介</a></li>
                            <li><a href="biz/about/expansion.php" target="_self">发展概述</a></li>
                            <li><a href="biz/about/honor.php" target="_self">企业荣誉</a></li>
                            <li><a href="biz/about/culture.php" target="_self">西软文化</a></li>
                        </ul>
                    </li>
                    <li class="top-nav-tab">
                        <h3><a href="<?php echo WEB_HOST; ?>index.php" class="top-nav-link" target="_self"><span>客户服务</span></a></h3>
                        <ul class="top-nav-sub clearfix">
                            <li><a href="biz/service/introduction.php" target="_self">工程实施</a></li>
                            <li><a href="biz/service/introduction.php" target="_self">售后服务</a></li>
                            <li><a href="biz/service/introduction.php" target="_self">资料下载</a></li>
                        </ul>
                    </li>
                    <li class="top-nav-tab">
                        <h3><a href="<?php echo WEB_HOST; ?>index.php" class="top-nav-link" target="_self"><span>产品信息</span></a></h3>
                    </li>
                    <li class="top-nav-tab">
                        <h3><a href="<?php echo WEB_HOST; ?>index.php" class="top-nav-link" target="_self"><span>新闻资讯</span></a></h3>
                        <ul class="top-nav-sub clearfix">
                            <li><a href="biz/news/introduction.php" target="_self">新闻动态</a></li>
                            <li><a href="biz/news/introduction.php" target="_self">行业资讯</a></li>
                        </ul>
                    </li>
                    <li class="top-nav-tab">
                        <h3><a href="<?php echo WEB_HOST; ?>index.php" class="top-nav-link" target="_self"><span>人力资源</span></a></h3>
                        <ul class="top-nav-sub clearfix">
                            <li><a href="biz/hr/introduction.php" target="_self">人力资源</a></li>
                            <li><a href="biz/hr/introduction.php" target="_self">人才战略</a></li>
                            <li><a href="biz/hr/introduction.php" target="_self">职位空缺</a></li>
                        </ul>
                    </li>
                    <li class="top-nav-tab">
                        <h3><a href="<?php echo WEB_HOST; ?>index.php" class="top-nav-link" target="_self"><span>联系我们</span></a></h3>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>