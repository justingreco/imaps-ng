
function spToDd(x, y) {
                //set coordinate system specifics, can be found looking at the coordinate system properties in ArcGIS
     //standard parallel 1
     var p1 = 34.333333333333343000
     //standard parallel 2
     var p2 = 36.166666666666657000
     //latitude of origin
     var p0 = 33.750000000000000000
     //central meridian
     var m0 = -79
     //false easting of central meridian
     var x0 = 2000000.002616666 
 
     //set datum specifics, current values for NAD83
                //semimajor Axis (converted to feet) 6378137 if meters (6378206.4 meters if NAD27)
     var a = 20925874.015664328;
                 //eccentricity of ellipsoid (0.08227185422 if NAD27)    
     var e = 0.08181922146;
 
 
     var e2 = e * e;
     var angRad = 0.01745329252;//1 degree to radians
     var pi4 = Math.PI/4;//pi divided by 4
     p1 = 34.333333333333343000 * angRad;
     p2 = 36.166666666666657000 * angRad;
     p0 = 33.750000000000000000 * angRad;
     m0 = -79 * angRad;
     var x0 = 2000000.002616666;
     
     var m1 = Math.cos(p1)/Math.sqrt(1- (e2 * Math.pow((Math.sin(p1)),2)));
     var m2 = Math.cos(p2)/Math.sqrt(1 - (e2 * Math.pow((Math.sin(p2)), 2)));
     var t1 = Math.tan(pi4 - (p1/2))/Math.pow((1 - e * Math.sin(p1))/ (1 + e * Math.sin(p1)), (e/2));
     var t2 =Math.tan(pi4 - (p2/2))/Math.pow((1 - e * Math.sin(p2))/ (1 + e * Math.sin(p2)), (e/2));
     var t0 =Math.tan(pi4 - (p0/2))/Math.pow((1 - e * Math.sin(p0))/ (1 + e * Math.sin(p0)), (e/2));   
     var n = Math.log(m1/m2)/Math.log(t1/t2);
     var f = m1/(n*Math.pow(t1, n));
     var rho0 = a * f * Math.pow(t0, n);
    
     x = x - x0;
     var pi2 = Math.PI/2;
     var rho = Math.sqrt(Math.pow(x,2) + (Math.pow(rho0 - y, 2)));
     var theta = Math.atan(x/(rho0 - y));
     var t = Math.pow(rho / (a * f), (1 / n));
     var lonR = theta / n + m0;
     x = x + x0;
    
     var lat0 = pi2 - (2 * Math.atan(t));
    
     var part1 = (1 - (e * Math.sin(lat0))) / (1 + (e * Math.sin(lat0)));
     var latR = pi2 - (2 * Math.atan(t * Math.pow(part1, (e/2))));
     while (Math.abs(latR - lat0) > 0.000000002) {
           lat0 = latR;
           part1 = (1 - (e * Math.sin(lat0))) / (1 + (e * Math.sin(lat0)));
           latR = pi2 - (2* Math.atan(t * Math.pow(part1, (e/2))));
     }
     
     var lat = latR/angRad;
     var lon = lonR/angRad;
     return [lat, lon];
}