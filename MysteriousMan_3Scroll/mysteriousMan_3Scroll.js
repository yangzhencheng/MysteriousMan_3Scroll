// Author: MysteriousMan
// QQ: 724207239
// https://github.com/yangzhencheng/MysteriousMan_3Scroll

function mysteriousMan_3Scroll(objName, paramJson){
    var fun3ScrollObj = new Object;

    var _obj, _objName, _json;
    var vectorWidth, middleVectorWidth, leftMiddleImg, imgWidth, imgHeight, smallImgWidth, middleImgHeight, middlelSmallImgTop, leftRightSmallImg;
    var showNum = 3;    // 展示多少图片
    var showInfo = "all";   // 展示所有文字信息 [all: 全部展示, none: 什么也不显示]
    var objVector;
    var activeID = 1;

    _objName = objName;
    _json = paramJson;

    // 没名字整个屁
    if(0 == _objName.length) return;
    // 没参数整个屁
    if(undefined == _json) return;

    // 获取 objName 对应的对象
    _obj = document.getElementById(objName);
    // 没这个对象整个屁
    if(null == _obj) return;
    
    // 看看有没有要展示的数据，没有整个屁呀！！！
    if(undefined == _json.imgList) return;
    // 少于三个，整个屁呀！！！
    if(3 > _json.imgList.length) return;

    // 没有大小整个屁呀
    if(undefined == _json.imgWidth) return;
    if(undefined == _json.imgHeight) return;
    if(undefined == _json.vectorWidth) return;


    // 设置控件名称及属性
    _obj.setAttribute("class", "mm3scroll");
    _obj.style.width = _json.vectorWidth + "px";
    _obj.style.height = _json.imgHeight + "px";
    

    // 图片获取
    imgWidth = _json.imgWidth;
    imgHeight = _json.imgHeight;
    middleImgHeight = Math.floor(imgHeight * 0.8);
    middlelSmallImgTop = Math.floor((imgHeight - middleImgHeight) / 2);   // 小图距顶部的距离
    vectorWidth = _json.vectorWidth;    // 容器控件大小
    middleVectorWidth = ((vectorWidth - imgWidth) / 2).toFixed(2);
    smallImgWidth = (imgWidth * (middleImgHeight / imgHeight)).toFixed(2);  // 变小了的图的宽
    leftMiddleImg = 0 - smallImgWidth + parseFloat(middleVectorWidth);  // 选中图左边距
    leftRightSmallImg = leftMiddleImg;      // 第三个小图



    // 获取图片信息展示方式
    switch(_json.showInfo.toLowerCase()){
        case "none":
            showInfo = "none";
            break;

        case "active":
            showInfo = "active";
            break;

        default:
            showInfo = "all";
            break;
    }

    // 在页面里建立相关的 HTML 容器
    _obj.append(createShowList());
    // 转入箭头
    if(undefined != _json.arrShow && "yes" == _json.arrShow){
        buildArr();
    }




    ///////////////////////////////////////////////////////////////////////////////
    /*
     * 函数区，哈哈哈……
     */

    // 建立 HTML 容器
    function createShowList(){
        var mainDiv = document.createElement("div");
        mainDiv.style.clear = "both";
        mainDiv.style.width = "1000px";
        mainDiv.style.height = imgHeight + "px";
        mainDiv.style.overflowY = "hidden";

        for(var i = 0; i < 3; i++){
            var vector = document.createElement("div");
            vector.setAttribute("class", "v");

            if(1 != i){
                vector.style.position = "relative";
                vector.style.top = middlelSmallImgTop + "px";
                vector.style.width = smallImgWidth + "px";
                vector.style.height = middleImgHeight + "px";
            }
            else{
                vector.style.position = "relative";
                vector.style.marginLeft = leftMiddleImg + "px";
                vector.style.zIndex = 100; 
                vector.style.width = imgWidth + "px";
                vector.style.height = imgHeight + "px";
            }

            if(2 == i) vector.style.marginLeft = leftRightSmallImg + "px";

            // 图片
            var img = document.createElement("img");
            img.src = _json.imgList[i].src;
            if(1 != i){
                img.style.width = smallImgWidth + "px";
                img.style.height = middleImgHeight + "px";
            }
            else{
                img.style.width = imgWidth + "px";
                img.style.height = imgHeight + "px";
            }
            vector.append(img);

            // 信息
            var info = document.createElement("div");
            info.setAttribute("class", "info");
            if("all" != showInfo) info.setAttribute("class", "info noshow");
            if(undefined != _json.imgList[i].info) info.innerHTML = _json.imgList[i].info;
            vector.append(info);

            // 合体
            mainDiv.append(vector);
        }

        return mainDiv;
    }


    // 建立左右箭头
    function buildArr(){
        var divArr = document.createElement("div");
        var leftArea = document.createElement("div");
        var rightArea = document.createElement("div");

        divArr.id = "mm3sMainArr";
        leftArea.id = "mm3sLeftArr";
        rightArea.id = "mm3sRightArr";
        // leftArea.style.display = "none";
        // rightArea.style.display = "none";

        divArr.style.clear = "both";
        divArr.style.height = imgHeight + "px";

        leftArea.style.width = middleVectorWidth + "px";
        leftArea.style.height = imgHeight + "px";
        leftArea.style.cssFloat = "left";
        leftArea.style.position = "relative";
        leftArea.style.zIndex = "30";
        leftArea.style.top = "-" + imgHeight + "px";
        leftArea.style.backgroundColor = "Black";
        leftArea.style.opacity = "0.7";
        leftArea.style.cursor = "pointer";
        leftArea.setAttribute("class", "leftArr");
        rightArea.style.width = middleVectorWidth + "px";
        rightArea.style.height = imgHeight + "px";
        rightArea.style.cssFloat = "right";
        rightArea.style.position = "relative";
        rightArea.style.zIndex = "30";
        rightArea.style.top = "-" + imgHeight + "px";
        rightArea.style.backgroundColor = "Black";
        rightArea.style.opacity = "0.7";
        rightArea.style.cursor = "pointer";
        rightArea.setAttribute("class", "rightArr");

        // 前滚
        leftArea.onclick = function(){
            fun3ScrollObj.provImg();
        }

        // 后滚
        rightArea.onclick = function(){
            fun3ScrollObj.backImg();
        }
        

        divArr.append(leftArea);
        divArr.append(rightArea);
        _obj.append(divArr);
    }



    /*
     * 向前滚
     */
    fun3ScrollObj.provImg = function provImg(){
        var newImg = "";
        var newInfo = "";

        // new v : v4
        activeID++;     // 活动标识提升
        if(activeID > (_json.imgList.length - 1)) activeID = 0;

        if((activeID + 1) > _json.imgList.length - 1){
            newImg = _json.imgList[0].src;
            if(undefined != _json.imgList[0].info) newInfo = _json.imgList[0].info;
        }
        else{
            newImg = _json.imgList[activeID + 1].src;
            if(undefined != _json.imgList[activeID + 1].info) newInfo = _json.imgList[activeID + 1].info;
        }

        var vector = document.createElement("div");
        vector.setAttribute("class", "v");
        vector.style.position = "relative";
        vector.style.top = middlelSmallImgTop + "px";
        vector.style.width = smallImgWidth + "px";
        vector.style.height = middleImgHeight + "px";
        vector.style.zIndex = -10;

        var img = document.createElement("img");
        img.src = newImg;
        img.style.width = smallImgWidth + "px";
        img.style.height = middleImgHeight + "px";
        vector.append(img);

        var info = document.createElement("div");
        info.setAttribute("class", "info");
        if("all" != showInfo) info.setAttribute("class", "info noshow");
        info.innerHTML = newInfo;
        vector.append(info);
        $(_obj).find("div:first").append(vector);



        // 调数据
        var $mainDiv = $(_obj).find("div:first").children();
        var v1 = $mainDiv.get(0);
        var v2 = $mainDiv.get(1);
        var $v2img = $(v2).find("img:first");
        var v3 = $mainDiv.get(2);
        var $v3img = $(v3).find("img:first");
        var v4 = $mainDiv.get(3);
        

        // 开始变型
        // v1
        $(v1).animate(
            {marginLeft: "-" + smallImgWidth + "px"},
            600,
            function(){
                $(v1).remove();
            }
        );

        v2.style.zIndex = 0;
        // v2
        $(v2).animate(
            {
                marginLeft: "0px",
                top: middlelSmallImgTop,
                width: smallImgWidth + "px",
                height: middleImgHeight + "px"
            },
            600
        );

        $v2img.animate(
            {
                width: smallImgWidth + "px",
                height: middleImgHeight + "px",
            },
            600
        );

        // v3
        $(v3).animate(
            {
                marginLeft: leftMiddleImg + "px",
                top: "0px",
                width: imgWidth + "px",
                height: imgHeight + "px",
                zIndex: 10
            },
            600
        );

        $v3img.animate(
            {
                width: imgWidth + "px",
                height: imgHeight + "px",
            },
            600
        );

        // v4
        $(v4).animate(
            {
                marginLeft: leftRightSmallImg + "px",
                zIndex: 0
            },
            600
        );
    }


    /*
     * 向后滚
     */
    fun3ScrollObj.backImg = function backImg(){
        var newImg = "";
        var newInfo = "";

        // new v : v0
        activeID--;     // 活动标识提升
        if(0 > activeID) activeID = _json.imgList.length - 1;

        if(0 > (activeID - 1)){
            var nowID = _json.imgList.length - 1;
            newImg = _json.imgList[nowID].src;
            if(undefined != _json.imgList[nowID].info) newInfo = _json.imgList[nowID].info;
        }
        else{
            newImg = _json.imgList[activeID - 1].src;
            if(undefined != _json.imgList[activeID - 1].info) newInfo = _json.imgList[activeID - 1].info; 
        }

        var vector = document.createElement("div");
        vector.setAttribute("class", "v");
        vector.style.position = "relative";
        vector.style.top = middlelSmallImgTop + "px";
        vector.style.width = smallImgWidth + "px";
        vector.style.height = middleImgHeight + "px";
        vector.style.marginLeft = "-" + smallImgWidth + "px";
        vector.style.zIndex = -10;

        var img = document.createElement("img");
        img.src = newImg;
        img.style.width = smallImgWidth + "px";
        img.style.height = middleImgHeight + "px";
        vector.append(img);

        var info = document.createElement("div");
        info.setAttribute("class", "info");
        if("all" != showInfo) info.setAttribute("class", "info noshow");
        info.innerHTML = newInfo;
        vector.append(info);
        $(_obj).find("div:first").prepend(vector);



        // 调数据
        var $mainDiv = $(_obj).find("div:first").children();
        var v1 = $mainDiv.get(0);
        var $v1img = $(v1).find("img:first");
        var v2 = $mainDiv.get(1);
        var $v2img = $(v2).find("img:first");
        var v3 = $mainDiv.get(2);
        var $v3img = $(v3).find("img:first");
        var v4 = $mainDiv.get(3);
        var $v4img = $(v4).find("img:first");
        

        // 开始变型
        // v1
        $(v1).animate(
            {marginLeft: 0 + "px"},
            600
        );

        v2.style.zIndex = 0;
        // v2
        $(v2).animate(
            {
                marginLeft: leftMiddleImg + "px",
                top: "0px",
                width: imgWidth + "px",
                height: imgHeight + "px"
            },
            600
        );

        $v2img.animate(
            {
                width: imgWidth + "px",
                height: imgHeight + "px",
                zIndex: 10
            },
            600
        );

        // v3
        v3.style.zIndex = -10;
        $(v3).animate(
            {
                marginLeft: leftRightSmallImg + "px",
                top: middlelSmallImgTop + "px",
                width: smallImgWidth + "px",
                height: middleImgHeight + "px",
                zIndex: -10
            },
            600
        );

        $v3img.animate(
            {
                width: smallImgWidth + "px",
                height: middleImgHeight + "px",
            },
            600
        );

        // v4
        $(v4).animate(
            {
                marginLeft: vectorWidth + "px",
                zIndex: -10
            },
            600,
            function(){
                $(v4).remove();
            }
        );
    }

    return fun3ScrollObj
}
