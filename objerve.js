function Objerve(parent, options){
    this.pKey = options.pKey || '$scope';
    this.temp = {};
    this.trap = options.trap;
    this.notify = options.notify;
    this.parent = parent;
    this._clone = {};
    this.install();
};
Objerve.prototype.method = function(){
    let temp = this.temp;
    let notify = this.notify;
    let trap = this.trap;
    let _this = this.parent;
    return {
        update(keys, fn){
            if (!keys.length) return;
            for (let k = 0; k < keys.length; k++){
                let key = keys[k];
                fn(key);
            };
        },
        defineProperty(key, cloned){
            Object.defineProperty(temp, key, {
                get(){
                    let t = trap.bind(_this)(key) || false;
                    if (t){
                        return t;
                    };
                    return cloned[key];
                },
                set(value){
                    notify.bind(_this)(value);
                    cloned[key] = value;
                },
            });
        }
    };
};
Objerve.prototype.install = function(){
    let {update, defineProperty} = this.method();
    let temp = this.temp;
    let cloned = this._clone;
    Object.defineProperty(this.parent, this.pKey, {
        configurable:true,
        get(){
            cloned = Object.assign(cloned, temp);
            let keys = Object.keys(temp);
            update(keys, function(key){
                defineProperty(key, cloned);
            });
            return temp;
        },
    });
};

Objerve.prototype.watch = function(array){
    let {update, defineProperty} = this.method();
    let cloned = this._clone;
    update(array, function(key){
        defineProperty(key, cloned);
    });
    return true;
};
