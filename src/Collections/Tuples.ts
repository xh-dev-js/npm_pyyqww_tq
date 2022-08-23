export class Tuple2<V1,V2> {
    _1: V1
    _2: V2

    get v1():V1 {
        return this._1
    }
    get v2():V2 {
        return this._2
    }

    constructor(v1: V1, v2: V2) {
        this._1 = v1;
        this._2 = v2;
    }

    v1u<NV1>(v3:NV1):Tuple2<NV1, V2>{
        return new Tuple2<NV1, V2>(v3, this._2)
    }

    v2u<NV2>(v3:NV2):Tuple2<V1, NV2>{
        return new Tuple2<V1, NV2>(this._1, v3)
    }

    static ofEmpty():Tuple2<null, null>{
        return new Tuple2(null,null)
    }
    static of<V1,V2,V3>(v1:V1, v2:V2):Tuple2<V1,V2>{
        return new Tuple2(v1,v2)
    }
}
export class Tuple3<V1, V2, V3> {
    _1: V1
    _2: V2
    _3: V3

    get v1():V1 {
        return this._1
    }
    get v2():V2 {
        return this._2
    }
    get v3():V3 {
        return this._3
    }

    constructor(v1: V1, v2: V2, v3: V3) {
        this._1 = v1;
        this._2 = v2;
        this._3 = v3;
    }

    v1u<NV1>(v1:NV1):Tuple3<NV1, V2, V3>{
        return new Tuple3<NV1, V2, V3>(v1, this._2, this._3)
    }
    v2u<NV2>(v2:NV2):Tuple3<V1, NV2, V3>{
        return new Tuple3<V1, NV2, V3>(this._1, v2, this._3)
    }
    v3u<NV3>(v3:NV3):Tuple3<V1, V2, NV3>{
        return new Tuple3<V1, V2, NV3>(this._1, this._2, v3)
    }

    static ofEmpty():Tuple3<null, null, null>{
        return new Tuple3(null,null,null)
    }
    static of<V1,V2,V3>(v1:V1, v2:V2, v3: V3):Tuple3<V1,V2,V3>{
        return new Tuple3(v1,v2,v3)
    }
}
export class Tuple4<V1, V2, V3, V4> {
    _1: V1
    _2: V2
    _3: V3
    _4: V4

    get v1():V1 {
        return this._1
    }
    get v2():V2 {
        return this._2
    }
    get v3():V3 {
        return this._3
    }
    get v4():V4 {
        return this._4
    }

    constructor(v1: V1, v2: V2, v3: V3, v4: V4) {
        this._1 = v1;
        this._2 = v2;
        this._3 = v3;
        this._4 = v4;
    }

    v1u<NV1>(v1:NV1):Tuple4<NV1, V2, V3, V4>{
        return new Tuple4<NV1, V2, V3, V4>(v1, this._2, this._3, this._4)
    }
    v2u<NV2>(v2:NV2):Tuple4<V1, NV2, V3, V4>{
        return new Tuple4<V1, NV2, V3, V4>(this._1, v2, this._3, this._4)
    }
    v3u<NV3>(v3:NV3):Tuple4<V1, V2, NV3, V4>{
        return new Tuple4<V1, V2, NV3, V4>(this._1, this._2, v3, this._4)
    }
    v4u<NV4>(v4:NV4):Tuple4<V1, V2, V3, NV4>{
        return new Tuple4<V1, V2, V3, NV4>(this._1, this._2, this._3, v4)
    }

    static ofEmpty():Tuple4<null, null, null, null>{
        return new Tuple4(null,null,null, null)
    }
    static of<V1,V2,V3, V4>(v1:V1, v2:V2, v3: V3, v4: V4):Tuple4<V1,V2,V3, V4>{
        return new Tuple4(v1,v2,v3, v4)
    }
}
