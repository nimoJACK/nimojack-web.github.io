(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // src/Configs/EnumType.ts
  var SoundType = /* @__PURE__ */ ((SoundType2) => {
    SoundType2["Bgm"] = "Bgm";
    SoundType2["Button"] = "Button";
    return SoundType2;
  })(SoundType || {});

  // src/Mgr/EventMgr.ts
  var EventMgr = class {
    /**type必须调用EventType里的type */
    static on(type, caller, listener, arg) {
      this.eventDispatcher.on(type, caller, listener, arg);
    }
    /**type必须调用EventType里的type */
    static event(type, data) {
      this.eventDispatcher.event(type, data);
    }
    /**type必须调用EventType里的type */
    static off(type, caller, listener) {
      this.eventDispatcher.off(type, caller, listener);
    }
    static offAllCaller(caller) {
      this.eventDispatcher.offAllCaller(caller);
    }
  };
  EventMgr.eventDispatcher = new Laya.EventDispatcher();

  // src/Tools/Vector3.ts
  var Vector3 = class _Vector3 {
    static add(v1, v2) {
      var v = new Laya.Vector3();
      Laya.Vector3.add(v1, v2, v);
      return v.clone();
    }
    static subtract(v1, v2) {
      var v = new Laya.Vector3();
      Laya.Vector3.subtract(v1, v2, v);
      return v.clone();
    }
    static mull(v1, multipy) {
      var v = new Laya.Vector3();
      Laya.Vector3.scale(v1, multipy, v);
      return v.clone();
    }
    static dot(v1, v2) {
      return Laya.Vector3.dot(v1, v2);
    }
    static cross(v1, v2) {
      var v = new Laya.Vector3();
      Laya.Vector3.cross(v1, v2, v);
      return v.clone();
    }
    static normalized(v) {
      var vTmp = new Laya.Vector3();
      Laya.Vector3.normalize(v, vTmp);
      return vTmp.clone();
    }
    static distance(v1, v2) {
      var vT = _Vector3.subtract(v1, v2);
      var dis = Laya.Vector3.scalarLength(vT);
      return dis;
    }
  };

  // src/Tools/cal/CalTool.ts
  var CalTool = class {
    /**2D格子碰撞判定 */
    static BoxCheck_2D_Normal(axis1, horizontal1, range1, width1, axis2, horizontal2, range2, width2) {
      let axisWay = axis2 - axis1;
      let horizontalWay = horizontal2 - horizontal1;
      let horizontalDis = Math.abs(horizontalWay);
      let axisDis = Math.abs(axisWay);
      let horizontalRange = (width1 + width2) / 2;
      let axisRange = (range1 + range2) / 2;
      return { isHit: horizontalDis < horizontalRange && axisDis < axisRange, axisDis, axisRange, horizontalDis, horizontalRange, axisWay, horizontalWay };
    }
    /**2D圆形碰撞判定 */
    static CircleCheck_2D(z1, x1, radius1, z2, x2, radius2) {
      let distancePow2 = Math.pow(z1 - z2, 2) + Math.pow(x1 - x2, 2);
      let rangePow2 = Math.pow(radius1 + radius2, 2);
      return { isHit: distancePow2 < rangePow2, distancePow2, rangePow2 };
    }
    /** 2D向量夹角 顺时针(0,180)，逆时针(0,-180) ,v2相对与v1的什么方向 */
    static getAngle2DWay(v1, v2) {
      var a = Laya.Vector2.dot(v1, v2);
      var b = Laya.Vector2.scalarLength(v1) * Laya.Vector2.scalarLength(v2);
      var angle = Math.acos(a / b) * 180 / Math.PI;
      var axis = v1.x * v2.y - v2.x * v1.y;
      if (axis > 0) {
        angle *= 1;
      } else if (axis < 0) {
        angle *= -1;
      } else {
        angle = 0;
      }
      return angle;
    }
    /**获取向量间夹角度-180~180*/
    static getAngle(v1, v2) {
      var a = Laya.Vector3.dot(v1, v2);
      var b = Laya.Vector3.scalarLength(v1) * Laya.Vector3.scalarLength(v2);
      if (b == 0) {
        if (v1.z > v2.z)
          return 0;
        else if (v1.z < v2.z)
          return 180;
        if (v1.y > v2.y)
          return 90;
        else if (v1.y < v2.y)
          return -90;
      }
      var cosAngle = a / b;
      if (cosAngle < -1) {
        cosAngle = -1;
      }
      if (cosAngle > 1) {
        cosAngle = 1;
      }
      var angle = Math.acos(cosAngle) * 180 / Math.PI;
      return angle;
    }
    //计算v1和v2所代表的平面法向量，与up向量的角度，用于判定，v1到v2的角度是＋还是－
    static getAngleUp(v1, v2, up) {
      let angle = this.getAngle(v1, v2);
      let crossNoraml = new Laya.Vector3();
      Laya.Vector3.cross(v2, v1, crossNoraml);
      if (this.getAngle(up, crossNoraml) > 90) {
        angle *= -1;
      }
      return angle;
    }
    /**获得dir 对应平面投影 */
    static getProjection(dir, normal) {
      let upProject = Vector3.mull(normal, Vector3.dot(dir, normal));
      let downProject = Vector3.subtract(dir, upProject);
      return downProject;
    }
    /**3D转屏幕坐标 */
    static d3_getSpritePosBySprite3DPoint(cam, target, offset = new Laya.Vector3(0, 0, 0)) {
      var pos = target.transform.position.clone();
      pos.x += offset.x;
      pos.y += offset.y;
      pos.z += offset.z;
      var outPos = new Laya.Vector4();
      cam.viewport.project(pos, cam.projectionViewMatrix, outPos);
      var pos2d = new Laya.Vector2(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
      return new Laya.Point(pos2d.x, pos2d.y);
    }
    /** 遍历rootNode的子节点，查找name匹配的节点
     * @param rootNode 根节点
     * @param name 需要查找的节点的name
     */
    static d3_FindNodeByName(rootNode, name) {
      let targetNode = null;
      let funC = (node) => {
        for (let i = 0; i < node.numChildren; i++) {
          if (node.getChildAt(i).name == name) {
            targetNode = node.getChildAt(i);
            return;
          } else {
            funC(node.getChildAt(i));
          }
        }
      };
      funC(rootNode);
      return targetNode;
    }
    /**求最大公约数 */
    static math_gcd(a, b) {
      return b == 0 ? a : this.math_gcd(b, a % b);
    }
    /**数值固定值靠近*/
    static numberTo(base, target, dt) {
      if (Math.abs(target - base) < dt) {
        base = target;
      } else if (base < target) {
        base += dt;
      } else if (base > target) {
        base -= dt;
      }
      return base;
    }
    /**随机范围数值 a是小，b是大*/
    static randomNumber(a, b) {
      return a + (b - a) * Math.random();
    }
    /**随机范围整数（包含最大值），a是小，b是大 */
    static randomInt(a, b) {
      return Math.floor(a + (b + 1 - a) * Math.random());
    }
    /**一半几率 */
    static halfPercent() {
      return Math.random() < 0.5;
    }
    /**指定几率 */
    static percent(axis) {
      return Math.random() < axis;
    }
    /**复制数组 */
    static cloneArray(array) {
      let outArray = [].concat(array);
      return outArray;
    }
    /**随机抽取数组中一个元素(不删除) */
    static getRandomInArray(array) {
      if (array.length) {
        let r = Math.random() * array.length;
        r = Math.floor(r);
        return array[r];
      } else {
        console.error("传入错误参数,返回空");
        return null;
      }
    }
    /**随机抽取数组中一个元素(删除) */
    static takeRandomInArray(array) {
      if (array.length) {
        let r = Math.random() * array.length;
        r = Math.floor(r);
        let obj = array[r];
        array.splice(r, 1);
        return obj;
      } else {
        console.error("传入错误参数,返回空");
        return null;
      }
    }
    /**打乱数组元素（洗牌） */
    static randomArray(array) {
      let newArray = new Array(array.length);
      let length = newArray.length;
      for (let i = 0; i < length; i++) {
        let obj = this.takeRandomInArray(array);
        newArray[i] = obj;
      }
      return newArray;
    }
    static clamp01(v) {
      if (v > 1)
        return 1;
      if (v < 0)
        return 0;
      return v;
    }
    static clamp(value, min, max) {
      if (value < min)
        return min;
      if (value > max)
        return max;
      return value;
    }
    /**json数据转成V3 */
    static JsonV3(V3, fix) {
      if (!fix) {
        return new Laya.Vector3(parseFloat(V3.x), parseFloat(V3.y), parseFloat(V3.z));
      } else {
        let x = Math.round(parseFloat(V3.x) * Math.pow(10, fix)) / Math.pow(10, fix);
        let y = Math.round(parseFloat(V3.y) * Math.pow(10, fix)) / Math.pow(10, fix);
        let z = Math.round(parseFloat(V3.z) * Math.pow(10, fix)) / Math.pow(10, fix);
        return new Laya.Vector3(x, y, z);
      }
    }
    /**V3转成json数据 */
    static V3ToJson(v3) {
      return {
        x: v3.x.toString(),
        y: v3.y.toString(),
        z: v3.z.toString()
      };
    }
    /**json数据转成V4 */
    static JsonV4(V4, fix) {
      if (!fix) {
        return new Laya.Vector4(parseFloat(V4.x), parseFloat(V4.y), parseFloat(V4.z), parseFloat(V4.w));
      } else {
        let x = Math.round(parseFloat(V4.x) * Math.pow(10, fix)) / Math.pow(10, fix);
        let y = Math.round(parseFloat(V4.y) * Math.pow(10, fix)) / Math.pow(10, fix);
        let z = Math.round(parseFloat(V4.z) * Math.pow(10, fix)) / Math.pow(10, fix);
        let w = Math.round(parseFloat(V4.w) * Math.pow(10, fix)) / Math.pow(10, fix);
        return new Laya.Vector4(x, y, z, w);
      }
    }
    /**V4转成json数据 */
    static V4ToJson(v4) {
      return {
        x: v4.x.toString(),
        y: v4.y.toString(),
        z: v4.z.toString(),
        w: v4.w.toString()
      };
    }
    //#region boxAABB 3D
    static BoxToBox(a, b) {
      return a.minX <= b.maxX && a.maxX >= b.minX && (a.minY <= b.maxY && a.maxY >= b.minY) && (a.minZ <= b.maxZ && a.maxZ >= b.minZ);
    }
    static SphereToSphere(sphere1, sphere2) {
      let distancePow2 = Math.pow(sphere1.x - sphere2.x, 2) + Math.pow(sphere1.y - sphere2.y, 2) + Math.pow(sphere1.z - sphere2.z, 2);
      let radiusPow2 = Math.pow(sphere1.radius, 2) + Math.pow(sphere2.radius, 2);
      return distancePow2 < radiusPow2;
    }
    //boxAABB and Sphere
    static SphereToBox(sphere, box) {
      var x = Math.max(box.minX, Math.min(sphere.x, box.maxX));
      var y = Math.max(box.minY, Math.min(sphere.y, box.maxY));
      var z = Math.max(box.minZ, Math.min(sphere.z, box.maxZ));
      var distance = Math.sqrt((x - sphere.x) * (x - sphere.x) + (y - sphere.y) * (y - sphere.y) + (z - sphere.z) * (z - sphere.z));
      return distance < sphere.radius;
    }
    //计算对应网格的BOXAABB数值
    static calcBounds(meshObj) {
      let pos = [];
      let meshComp = meshObj.getComponent(Laya.MeshFilter);
      if (!meshComp)
        return null;
      meshComp.sharedMesh.getPositions(pos);
      let newSprtit3D = new Laya.Sprite3D();
      meshObj.addChild(newSprtit3D);
      for (let i2 = 0; i2 < pos.length; i2++) {
        newSprtit3D.transform.localPosition = new Laya.Vector3(pos[i2].x, pos[i2].y, pos[i2].z);
        pos[i2] = newSprtit3D.transform.position.clone();
      }
      let maxX = pos[0].x;
      let maxY = pos[0].y;
      let maxZ = pos[0].z;
      let minX = maxX;
      let minY = maxY;
      let minZ = maxZ;
      for (var i = 0; i < pos.length; i++) {
        maxX = Math.max(maxX, pos[i].x);
        maxY = Math.max(maxY, pos[i].y);
        maxZ = Math.max(maxZ, pos[i].z);
        minX = Math.min(minX, pos[i].x);
        minY = Math.min(minY, pos[i].y);
        minZ = Math.min(minZ, pos[i].z);
      }
      return {
        maxX,
        maxY,
        maxZ,
        minX,
        minY,
        minZ
      };
    }
    //#endregion
    //射线 pt1,pt2线段,pt点,distance点到线段最短距离
    static calculateDistance(pt1, pt2, pt) {
      let egdeV1 = Vector3.subtract(pt2, pt1);
      let egdeV2 = Vector3.subtract(pt, pt1);
      let v1Norm = Vector3.normalized(egdeV1.clone());
      let v2Norm = Vector3.normalized(egdeV2.clone());
      let cos1 = Math.abs(Vector3.dot(v1Norm, v2Norm));
      let egdeV3 = Vector3.subtract(pt, pt2);
      let egdeV4 = Vector3.subtract(pt1, pt2);
      let v3Norm = Vector3.normalized(egdeV3.clone());
      let v4Norm = Vector3.normalized(egdeV4.clone());
      let cos2 = Math.abs(Vector3.dot(v3Norm, v4Norm));
      if (cos2 > 0 && cos1 > 0) {
        let sin = Math.sqrt(1 - cos1 * cos1);
        let yDistance = Vector3.distance(pt1, pt);
        let distance = yDistance * sin;
        let xDistance = yDistance * cos1;
        let dir = Vector3.mull(Vector3.normalized(egdeV1.clone()), xDistance);
        let targetPt = Vector3.add(pt1.clone(), dir);
        return { "pt1": pt1, "pt2": pt2, "pt": pt, "distance": distance };
      }
      return null;
    }
  };

  // src/Comps/ctrl/TouchScan.ts
  var { regClass, property } = Laya;
  var TouchScan = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.firstId = -1;
      this.secondId = -1;
      this.firstOriginalPoint = new Laya.Vector2();
      this.secondOriginalPoint = new Laya.Vector2();
      this.isSecond = false;
    }
    onMouseDown(e) {
      this.mouseDown(e);
    }
    onMouseMove(e) {
      this.mouseMove(e);
    }
    onMouseOut(e) {
      this.mouseOver(e);
    }
    onMouseOver(e) {
      this.mouseOver(e);
    }
    onMouseUp(e) {
      this.mouseOver(e);
    }
    onKeyDown(e) {
      EventMgr.event("KeyDown" /* KeyDown */, e);
    }
    mouseDown(e) {
      if (this.isSecond == false) {
        if (this.firstId == -1) {
          this.firstId = e.touchId;
          EventMgr.event("Touch_SingleTouchStart" /* Touch_SingleTouchStart */, e);
          this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
        } else if (this.firstId != e.touchId && this.secondId == -1) {
          this.secondId = e.touchId;
          this.isSecond = true;
          EventMgr.event("Touch_SecondTouchMove" /* Touch_SecondTouchMove */, e);
          this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
        }
      } else {
        if (this.firstId == -1) {
          this.firstId = e.touchId;
          this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
        } else if (this.secondId == -1) {
          this.secondId = e.touchId;
          this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
        }
      }
    }
    mouseMove(e) {
      if (this.isSecond == false) {
        if (e.touchId == this.firstId) {
          EventMgr.event("Touch_SingleTouchMove" /* Touch_SingleTouchMove */, e);
        }
      } else {
        if (this.firstId != -1 && this.secondId != -1) {
          let data = {
            distance: 0,
            angle: 0
          };
          let lastDir = this.Vector2Reduce(this.secondOriginalPoint, this.firstOriginalPoint);
          let lastDistance = Laya.Vector2.scalarLength(lastDir);
          let nowDir;
          if (e.touchId == this.firstId) {
            nowDir = this.Vector2Reduce(this.secondOriginalPoint, new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height));
          } else if (e.touchId == this.secondId) {
            nowDir = this.Vector2Reduce(new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height), this.firstOriginalPoint);
          }
          if (nowDir) {
            let nowDistance = Laya.Vector2.scalarLength(nowDir);
            data.distance = nowDistance - lastDistance;
            data.angle = CalTool.getAngle2DWay(lastDir, nowDir);
            EventMgr.event("Touch_SecondTouchMove" /* Touch_SecondTouchMove */, data);
          }
        }
      }
      if (e.touchId == this.firstId) {
        this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
      }
      if (e.touchId == this.secondId) {
        this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
      }
    }
    mouseOver(e) {
      if (e.touchId == this.firstId) {
        this.firstOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
      }
      if (e.touchId == this.secondId) {
        this.secondOriginalPoint = new Laya.Vector2(e.stageX / Laya.stage.width, e.stageY / Laya.stage.height);
      }
      if (this.isSecond == false) {
        if (e.touchId == this.firstId) {
          EventMgr.event("Touch_SingleTouchEnd" /* Touch_SingleTouchEnd */, e);
          this.firstId = -1;
        }
      } else {
        if (e.touchId == this.firstId) {
          this.firstId = -1;
        }
        if (e.touchId == this.secondId) {
          this.secondId = -1;
        }
        if (this.firstId == -1 && this.secondId == -1) {
          this.isSecond = false;
        }
      }
    }
    Vector2Reduce(a, b) {
      return new Laya.Vector2(a.x - b.x, a.y - b.y);
    }
  };
  TouchScan = __decorateClass([
    regClass("cI_HuIiCTdKCqTKmBORBLA")
  ], TouchScan);

  // src/Configs/GameData.ts
  var GameData = class {
    //平台类型
    static testStorageChange() {
    }
  };
  GameData.isDebug = true;
  //是否debug
  GameData.isTest = true;
  //是否开发者模式
  GameData.musicTime = 1e3 * 60 * 1;
  GameData.platform = "Default" /* Default */;

  // src/Mgr/Scene2DMgr.ts
  var { regClass: regClass2, property: property2 } = Laya;
  var Scene2DMgr = class extends Laya.Script {
    init() {
      console.log("2D管理器初始化");
    }
  };
  Scene2DMgr = __decorateClass([
    regClass2("vRNslMp0TmGiTOJANlx4jg")
  ], Scene2DMgr);

  // src/Mgr/SoundMgr.ts
  var _SoundMgr = class _SoundMgr {
    //音乐格式
    static init() {
      console.log("声音系统初始化");
      this._soundCtx = {};
      this._soundFile = [];
      this.loopSounds = [];
      for (var key in SoundType) {
        let sound = key;
        this._soundFile.push(sound);
      }
      console.log("音效：", this._soundFile);
      let path = this._pathRoot;
      let file = "";
      let soundFile = this._soundFile;
      let soundCount = this._soundFile.length;
      for (let i = 0; i < soundCount; ++i) {
        file = soundFile[i];
        let innerAudioContext = new Laya.SoundChannel();
        innerAudioContext.url = path + file + this.soundType;
        Laya.SoundManager.addChannel(innerAudioContext);
        this._soundCtx[file] = true;
      }
      Laya.SoundManager.autoStopMusic = true;
    }
    /**设置音量 */
    static setSoundVolume(name, value) {
      if (this._soundCtx[name]) {
        Laya.SoundManager.setSoundVolume(value, this._pathRoot + name + this.soundType);
      }
    }
    static play(name, isLoop = false) {
      if (this._soundCtx[name]) {
        if (isLoop && this.loopSounds.indexOf(name) == -1) {
          this.loopSounds.push(name);
          return Laya.SoundManager.playSound(this._pathRoot + name + this.soundType, 0);
        } else {
          return Laya.SoundManager.playSound(this._pathRoot + name + this.soundType);
        }
      }
    }
    static stop(name, isLoop = false) {
      if (this._soundCtx[name]) {
        if (isLoop) {
          let index = this.loopSounds.indexOf(name);
          if (index != -1)
            this.loopSounds.splice(index, 1);
        }
        Laya.SoundManager.stopSound(this._pathRoot + name + this.soundType);
      }
    }
    static playMusic(name) {
      let soundChannel;
      Laya.SoundManager.stopMusic();
      if (name) {
        soundChannel = Laya.SoundManager.playMusic(this._pathRoot + name + this.soundType, 0);
        this.currentBgm = name;
      } else if (this.currentBgm) {
        soundChannel = Laya.SoundManager.playMusic(this._pathRoot + this.currentBgm + this.soundType, 0);
      } else {
        soundChannel = Laya.SoundManager.playMusic(this._pathRoot + "Bgm" /* Bgm */ + this.soundType, 0);
      }
      return soundChannel;
    }
    static stopMusic() {
      Laya.SoundManager.stopMusic();
    }
    /**背景音乐播放 */
    static randomPlayMusic() {
      let url = "Bgm" /* Bgm */;
      let time = GameData.musicTime;
      Laya.timer.once(time, this, this.randomPlayMusic);
      if (!this.isMusic)
        return;
      _SoundMgr.playMusic(url);
    }
    static soundSwitch(isActive) {
      this.isSound = isActive;
      Laya.SoundManager.soundMuted = !this.isSound;
      if (this.currentBgm) {
        this.stopMusic();
        this.currentBgm = null;
      } else {
        this.randomPlayMusic();
      }
    }
    static muiscSwitch(isActive) {
      this.isMusic = isActive;
      Laya.SoundManager.musicMuted = !this.isMusic;
    }
    static playSoundLimit(name) {
      let isCanPlay = true;
      if (this.CDs[name]) {
        if (this.CDs[name] != 0) {
          isCanPlay = false;
        }
      }
      if (isCanPlay) {
        let channel = this.play(name);
        if (channel)
          this.CDs[name] = channel.duration * 200;
        Laya.timer.once(this.CDs[name], this, () => {
          this.CDs[name] = 0;
        });
      }
    }
    //#endregion
  };
  _SoundMgr._pathRoot = "resources/Sound/";
  //循环的音效列表
  _SoundMgr.soundType = ".mp3";
  /**音量开关 */
  _SoundMgr.isSound = true;
  _SoundMgr.isMusic = true;
  //#region 游戏避免重复播放的音效
  _SoundMgr.CDs = {};
  var SoundMgr = _SoundMgr;

  // src/Tools/Tool.ts
  var _Tool = class _Tool {
    //#region 杂项
    /** 遍历rootNode的子节点，查找name匹配的节点
    * @param rootNode 根节点
    * @param name 需要查找的节点的name
    */
    static d3_FindNodeHasName(rootNode, name) {
      let targetNode = null;
      let funC = (node) => {
        for (let i = 0; i < node.numChildren; i++) {
          if (node.getChildAt(i).name.indexOf(name) != -1) {
            targetNode = node.getChildAt(i);
            return;
          } else {
            funC(node.getChildAt(i));
          }
        }
      };
      funC(rootNode);
      return targetNode;
    }
    /**将所有第一级子物体的active设为false */
    static d3_unactiveAllChildren(node) {
      for (let i = 0; i < node.numChildren; i++) {
        node.getChildAt(i).active = false;
      }
    }
    /**将物体addChild进去，但位置和角度不变 */
    static d3_addChildNotMove(obj, parent) {
      let pos = obj.transform.position.clone();
      let rot = obj.transform.rotation.clone();
      parent.addChild(obj);
      obj.transform.position = pos;
      obj.transform.rotation = rot;
    }
    /** 按钮事件
    * @param btn 按钮
    * @param caller 事件对象
    * @param callBack 回调函数
    * @param args 参数
    * @param isStopPropagation 是否阻止穿透
    */
    static d2_AddClickEvent(btn, callBack, caller, args, isStopPropagation = false, isSound = true, isTween = true) {
      btn.offAllCaller(caller);
      let tweenTime = 60;
      let oldSize = btn.scaleX;
      let newSize = oldSize * 0.9;
      let isPressed = false;
      let cbDown = (evt) => {
        isPressed = true;
        if (isTween)
          Laya.Tween.to(btn, { scaleX: newSize, scaleY: newSize }, tweenTime);
        if (isStopPropagation)
          evt.stopPropagation;
      };
      btn.on(Laya.Event.MOUSE_DOWN, caller, cbDown, args);
      let cbUp = (evt) => {
        if (isPressed == false)
          return;
        isPressed = false;
        if (isStopPropagation)
          evt.stopPropagation;
        if (isTween)
          Laya.Tween.to(btn, { scaleX: oldSize, scaleY: oldSize }, tweenTime, null, Laya.Handler.create(btn, () => {
            if (callBack)
              callBack.call(caller, evt);
          }));
        else {
          if (callBack)
            callBack.call(caller, evt);
        }
        if (isSound)
          SoundMgr.play("Button" /* Button */);
      };
      btn.on(Laya.Event.MOUSE_UP, caller, cbUp, args);
      let cbOut = (evt) => {
        if (isPressed == false)
          return;
        isPressed = false;
        if (isTween)
          Laya.Tween.to(btn, { scaleX: oldSize, scaleY: oldSize }, tweenTime);
        if (isStopPropagation)
          evt.stopPropagation;
      };
      btn.on(Laya.Event.MOUSE_OUT, caller, cbOut, args);
    }
    /**获取当前时间戳 ms*/
    static get getCurrentTime() {
      return (/* @__PURE__ */ new Date()).getTime();
    }
    /**获取当前时间戳 s*/
    static get getCurrentTime_Second() {
      return Math.floor(Date.parse((/* @__PURE__ */ new Date()).toString()) / 1e3);
    }
    //#endregion
    //#region 3D表现类
    /**16进制RGB转colorV4 */
    static d3_getRgbByHex(_hexColor) {
      var color = [], rgb = [];
      let hexColor = _hexColor.replace(/#/, "");
      if (hexColor.length == 3) {
        var tmp = [];
        for (var i = 0; i < 3; i++) {
          tmp.push(hexColor.charAt(i) + hexColor.charAt(i));
        }
        hexColor = tmp.join("");
      }
      for (var i = 0; i < 3; i++) {
        color[i] = "0x" + hexColor.substr(i * 2, 2);
        rgb.push(parseInt(color[i]));
      }
      return new Laya.Vector4(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 0);
    }
    /**物体抖动
    * (抖动期间，会修改物体的localPosition，抖动期间移动会有bug，会有Bug)
    *  */
    static d3_objectShake(target, shakeTime = 1, shakeAmount = 0.7) {
      var shake = shakeTime;
      var decreaseFactor = 1;
      var originalPos = target.transform.localPosition.clone();
      Laya.timer.frameLoop(1, this, updateShake);
      function randomPos() {
        var x = Math.random() > 0.5 ? Math.random() : -Math.random();
        var y = Math.random() > 0.5 ? Math.random() : -Math.random();
        return new Laya.Vector3(x, y, 0);
      }
      function updateShake() {
        if (shake > 0) {
          var pos = new Laya.Vector3();
          Laya.Vector3.scale(randomPos(), shakeAmount, pos);
          Laya.Vector3.add(originalPos, pos, pos);
          target.transform.localPosition = pos;
          shake -= 0.02 * decreaseFactor;
        } else {
          shake = 0;
          target.transform.localPosition = originalPos;
          Laya.timer.clear(this, updateShake);
        }
      }
    }
    /**开启抗锯齿 */
    static useRetinalCanvas() {
      Laya.stage.useRetinalCanvas = true;
    }
    /**关闭抗锯齿 */
    static disabelRetinalCanvas() {
      Laya.stage.useRetinalCanvas = false;
    }
    /**设置场景雾化 */
    static setFog(isOpen, scene, color) {
      scene.enableFog = isOpen;
      if (isOpen) {
        scene.fogColor = color;
        scene.fogStart = 10;
        scene.fogRange = 30;
      }
    }
    /**使摄像机横向不变 */
    static setCameraAlignX(camera) {
      let axis = 1;
      if (!this.originalSize) {
        this.originalSize = camera.orthographicVerticalSize;
      }
      let camSize = this.originalSize;
      let origin = 1334 / 750;
      let now = Laya.stage.displayHeight / Laya.stage.displayWidth;
      camera.orthographicVerticalSize = camSize * now / origin * axis;
    }
    /**数字Toast*/
    static d2_numberLabelToast(value, target) {
      let color = value >= 0 ? this.greenColor : this.redColor;
      let url = value >= 0 ? "+" : "-";
    }
    //#region 收集金币动效
    static d2_coinCollectAnim(url, startPos, endPos, parent, amount = 15, scale = 1, callBack = null, coinArriveCallBack = null) {
      var amountTmp = amount;
      for (var i = 0; i < amount; i++) {
        let coin = Laya.Pool.getItemByClass("coin", Laya.Image);
        let isRecover = false;
        coin.skin = url;
        coin.x = startPos.x;
        coin.y = startPos.y;
        coin.scale(scale, scale);
        parent.addChild(coin);
        let time = 300 + Math.random() * 100 - 50;
        Laya.timer.once(time + 1e3, this, () => {
          if (isRecover)
            return;
          parent.removeChild(coin);
          Laya.Pool.recover("coin", coin);
        });
        Laya.Tween.to(coin, { x: coin.x + Math.random() * 250 - 125, y: coin.y + Math.random() * 250 - 125 }, time);
        Laya.timer.once(time + 50, this, function() {
          Laya.Tween.to(coin, { x: endPos.x, y: endPos.y }, 400, null, new Laya.Handler(this, function() {
            parent.removeChild(coin);
            Laya.Pool.recover("coin", coin);
            isRecover = true;
            amountTmp--;
            coinArriveCallBack && coinArriveCallBack();
            if (amountTmp == 0 && callBack)
              callBack(parent);
          }));
        });
      }
    }
    static d2_coinCollectAnimAni(ani, startPos, endPos, parent, amount = 15, callBack = null) {
      var amountTmp = amount;
      for (var i = 0; i < amount; i++) {
        let coin = Laya.Pool.getItemByClass("coinAnim", Laya.Clip);
        coin.skin = ani.skin;
        coin.index = ani.index;
        coin.clipX = ani.clipX;
        coin.clipY = ani.clipY;
        coin.autoPlay = ani.autoPlay;
        coin.x = startPos.x;
        coin.y = startPos.y;
        coin.scale(0.8, 0.8);
        parent.addChild(coin);
        let time = 300 + Math.random() * 100 - 50;
        Laya.Tween.to(coin, { x: coin.x + Math.random() * 250 - 125, y: coin.y + Math.random() * 250 - 125 }, time);
        Laya.timer.once(time + 50, this, function() {
          Laya.Tween.to(coin, { x: endPos.x, y: endPos.y }, 400, null, new Laya.Handler(this, function() {
            parent.removeChild(coin);
            Laya.Pool.recover("coinAnim", coin);
            amountTmp--;
            if (amountTmp == 0 && callBack)
              callBack(parent);
          }));
        });
      }
    }
    //#endregion
    /**表情弹出淡化Toast */
    static faceToast(faceUrl, parent, startPos, endPos) {
      let image = new Laya.Image(faceUrl);
      image.anchorX = 0.5;
      image.anchorY = 0.5;
      image.alpha = 1;
      image.scaleX = 0.3;
      image.scaleY = 0.3;
      parent.addChild(image);
      image.x = startPos.x;
      image.y = startPos.y;
      Laya.Tween.to(image, { x: endPos.x, y: endPos.y, alpha: 0.9 }, 1e3, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
        if (image && !image.destroyed) {
          Laya.Tween.to(image, { x: endPos.x, y: endPos.y - 100, alpha: 0 }, 1e3, null, Laya.Handler.create(this, () => {
            if (image && !image.destroyed) {
              image.destroy();
            }
          }));
        }
      }));
    }
    /**FontCli弹出淡化 */
    static d2_fontClipToast(clipUrl, value, parent, scale, startPos) {
      if (!this.wordToastOk)
        return;
      let clip = Laya.Pool.getItemByClass("fontClip_d2", Laya.FontClip);
      clip.skin = clipUrl;
      clip.sheet = "0123456789";
      clip.value = value;
      clip.anchorX = 0.5;
      clip.anchorY = 0.5;
      clip.alpha = 1;
      clip.scaleX = scale;
      clip.scaleY = scale;
      parent.addChild(clip);
      clip.x = startPos.x;
      clip.y = startPos.y;
      let endPos = new Laya.Vector2(startPos.x + (CalTool.halfPercent() ? CalTool.randomInt(-100, -75) : CalTool.randomInt(75, 100)), startPos.y - 50);
      Laya.Tween.to(clip, { x: endPos.x, y: endPos.y, alpha: 0.9 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
        Laya.Tween.to(clip, { x: endPos.x, y: endPos.y - 90, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
          parent.removeChild(clip);
          Laya.Pool.recover("fontClip_d2", clip);
        }));
      }));
    }
    static d2_imageToast(wordUrl, parent, startPos) {
      if (!this.wordToastOk)
        return;
      _Tool.wordToastOk = false;
      let image = new Laya.Image(wordUrl);
      image.anchorX = 0.5;
      image.anchorY = 0.5;
      image.alpha = 1;
      parent.addChild(image);
      image.top = 300;
      image.centerX = 0;
      let endPos = startPos;
      image.scaleX = 0;
      image.scaleY = 0;
      Laya.Tween.to(image, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
        _Tool.wordToastOk = true;
        if (image && !image.destroyed) {
          Laya.Tween.to(image, { top: 200, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
            if (image && !image.destroyed) {
              image.destroy();
            }
          }));
        }
      }));
    }
    /**Label淡出Toast */
    static d2_labelToast(value, color, parent, scale, startPos) {
      let label = Laya.Pool.getItemByClass("label_d2", Laya.Label);
      label.text = value;
      label.color = color;
      label.anchorX = 0.5;
      label.anchorY = 0.5;
      label.alpha = 1;
      label.scaleX = scale;
      label.scaleY = scale;
      label.font = "Microsoft YaHei";
      label.fontSize = 50;
      label.bold = true;
      parent.addChild(label);
      label.x = startPos.x;
      label.y = startPos.y;
      let endPos = new Laya.Vector2(startPos.x + (CalTool.halfPercent() ? CalTool.randomInt(-100, -75) : CalTool.randomInt(75, 100)), startPos.y - 50);
      Laya.Tween.to(label, { x: endPos.x, y: endPos.y, alpha: 0.9 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
        Laya.Tween.to(label, { x: endPos.x, y: endPos.y - 90, alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
          parent.removeChild(label);
          Laya.Pool.recover("label_d2", label);
        }));
      }));
    }
    //#endregion
  };
  //#endregion
  //#region 2DUI表现类
  //绿色
  _Tool.greenColor = "#00FF00";
  //红色
  _Tool.redColor = "#FF0000";
  /**图片淡出Toast */
  _Tool.wordToastOk = true;
  var Tool = _Tool;

  // src/Mgr/Scene3DMgr.ts
  var { regClass: regClass3, property: property3 } = Laya;
  var Scene3DMgr = class extends Laya.Script {
    init() {
      console.log("3D管理器初始化");
      Tool.useRetinalCanvas();
    }
  };
  Scene3DMgr = __decorateClass([
    regClass3("pTmPS6fiRx26GdxcbYHj3w")
  ], Scene3DMgr);

  // src/Configs/StorageData.ts
  var StorageData = class {
    constructor() {
      /**存档赋予版本*/
      this.gameVersion = "0";
    }
  };

  // src/Mgr/StorageMgr.ts
  var StorageMgr = class {
    /**初始化存档 */
    static init() {
      console.log("存档系统初始化");
      for (let key in this.storageData) {
        let jsonData = this.readStorage(key);
        if (!jsonData) {
          this.writeStorage(key, this.storageName[key]);
          if (GameData.isTest)
            console.log("初始化缓存数据", key, this.storageName[key]);
        } else {
          this.storageData[key] = JSON.parse(jsonData);
          if (GameData.isTest)
            console.log("加载缓存数据", key, this.storageData[key]);
        }
        this.storageName[key] = key;
      }
      this.versionDeal();
      GameData.testStorageChange();
    }
    /**存档版本处理 */
    static versionDeal() {
      if (this.storageData.gameVersion != new StorageData().gameVersion) {
        console.log("版本不一致，触发清理存档");
        localStorage.clear();
        this.storageData = new StorageData();
        this.storageName = new StorageData();
        for (let key in this.storageData) {
          this.writeStorage(key, this.storageName[key]);
          if (GameData.isTest)
            console.log("初始化缓存数据", key, this.storageName[key]);
          this.storageName[key] = key;
        }
        return;
      }
    }
    /**写入缓存 */
    static writeStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
      this.storageData[key] = value;
    }
    /**读取缓存 */
    static readStorage(key) {
      return localStorage.getItem(key);
    }
    /**移除缓存 */
    static removeStorage(key) {
      localStorage.removeItem(key);
    }
    /**存入所有存档 */
    static SaveAllStorge() {
      for (let key in this.storageData) {
        this.writeStorage(key, this.storageData[key]);
      }
    }
    //#endregion
  };
  /**缓存数据 */
  StorageMgr.storageData = new StorageData();
  /**缓存键名 */
  StorageMgr.storageName = new StorageData();

  // src/Main.ts
  var { regClass: regClass4, property: property4 } = Laya;
  var Main = class extends Laya.Script {
    onAwake() {
      Main.instance = this;
      StorageMgr.init();
      SoundMgr.init();
      if (GameData.isTest) {
        console.log("测试模式关闭背景音乐");
        Laya.Stat.show();
        console.log("性能面板展示");
      } else {
        console.log("播放背景音乐");
        SoundMgr.randomPlayMusic();
      }
      this.Scene3D.init();
      this.Scene2D.init();
    }
    onUpdate() {
    }
  };
  __decorateClass([
    property4({ type: Scene3DMgr })
  ], Main.prototype, "Scene3D", 2);
  __decorateClass([
    property4({ type: Scene2DMgr })
  ], Main.prototype, "Scene2D", 2);
  Main = __decorateClass([
    regClass4("e60XQm7tTY2BwFAdxb8D1g")
  ], Main);
})();
