#设备事件
* deviceorientation设备方向
* devicemotion 设备动作

```javascript
		if(window.DeviceMotionEvent){
			window.addEventListener('devicemotion',function(e){
		
					var motion = e.accelerationIncludingGravity;
					var x = parseInt(motion.x);
					var y = parseInt(motion.y);
					var z = parseInt(motion.z);
				}
			})
		} 
