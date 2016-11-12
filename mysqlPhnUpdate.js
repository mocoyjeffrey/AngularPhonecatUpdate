var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "phonecat_update"
});

app.use(express.static('public'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/app'));


app.get('/phonelist', function(req, res){
	//res.send("Hello HTML!");
	connection.query("SELECT *"+ 
		"FROM phone", function(error,rows,fields){
		res.end(JSON.stringify(rows));
	});
});
/*app.get('/phonedetail/:ids ', function(req, res){*/
	//res.send("Hello HTML!");
app.get('/phonedetail/:id', function(req, res){
	 var id = req.params.id;
	//console.log(req.params.id);
	connection.query("SELECT "+
		"pd.phone_id, "+
		"pd.id, "+
		"pd.description, "+ 
		"pd.name,"+ 
		"pd.additionalFeatures, "+
		"p.age, p.carrier, p.imageUrl, p.snippet, "+
		"b.standbyTime, "+
		"b.talkTime,b.type, "+
		"a.os,a.ui, "+
		"av.list, "+
		"c.camera_id,c.features, c.primary, "+
		"ct.connectivity_id,ct.bluetooth,ct.cell,ct.gps,ct.infrared,ct.wifi, "+
		"d.display_id,d.screenResolution,d.screenSize,d.touchScreen, "+
		"h.hardware_id, h.accelerometer, h.audioJack, h.cpu,h.fmRadio,h.physicalKeyboard,h.usb,"+
		"i.images_id, i.list, "+
		"sw.size_weight_id,sw.dimensions,sw.weight, "+
		"s.storage_id, s.flash, s.ram "+
		"FROM phonedetail AS pd "+
		"INNER JOIN phone AS p ON p.phone_id=pd.phone_id "+
		"INNER JOIN battery AS b ON b.phone_id=pd.phone_id "+
		"INNER JOIN android AS a ON a.phone_id=pd.phone_id "+
		"INNER JOIN availability AS av ON av.phone_id=pd.phone_id "+
		"INNER JOIN camera AS c ON c.phone_id=pd.phone_id "+
		"INNER JOIN connectivity AS ct ON ct.phone_id=pd.phone_id "+
		"INNER JOIN display AS d ON d.phone_id=pd.phone_id "+
		"INNER JOIN hardware AS h ON h.phone_id=pd.phone_id "+
		"INNER JOIN images AS i ON i.phone_id=pd.phone_id "+
		"INNER JOIN size_weight AS sw ON sw.phone_id=pd.phone_id "+
		"INNER JOIN storage AS s ON s.phone_id=pd.phone_id "+
	 /*"WHERE id= 'motorola-xoom-with-wi-fi'", function(error,rows,fields){*/
	 	"WHERE pd.id= '"+id+"'", function(error,rows,fields){
	 	/*"WHERE id= '"+req.params.ids+"'", function(error,rows,fields){*/
	 	//console.log(JSON.stringify(rows))
		res.end(JSON.stringify(rows));
	});

	/*connection.query("SELECT phone_id, id, description, name, additionalFeatures"+ 
	"FROM phonedetail WHERE id= 'motorola-xoom-with-wi-fi'", function(error,rows,fields){
	res.end(JSON.stringify(rows));
 	});*/
});


app.get('/deletephone/:id', function(req, res){
	 var id = req.params.id;
	console.log(req.params.id);

	var sqlDelete = "DELETE FROM phonedetail, battery, android, availability, camera, connectivity, display, hardware, images, size_weight, storage, phone "+
					"USING phonedetail INNER JOIN battery INNER JOIN android INNER JOIN "+
					"availability INNER JOIN camera INNER JOIN connectivity INNER JOIN "+
					"display INNER JOIN hardware INNER JOIN images INNER JOIN size_weight INNER JOIN storage INNER JOIN phone "+
					"WHERE phonedetail.id = '"+id+"' "+
					"AND battery.phone_id=phonedetail.phone_id "+
					"AND android.phone_id=phonedetail.phone_id "+
					"AND availability.phone_id=phonedetail.phone_id "+
					"AND camera.phone_id=phonedetail.phone_id "+
					"AND connectivity.phone_id=phonedetail.phone_id "+
					"AND display.phone_id=phonedetail.phone_id "+
					"AND hardware.phone_id=phonedetail.phone_id "+
					"AND images.phone_id=phonedetail.phone_id "+
					"AND size_weight.phone_id=phonedetail.phone_id "+
					"AND storage.phone_id=phonedetail.phone_id "+
					"AND phone.phone_id=phonedetail.phone_id";

	connection.query(sqlDelete, function(error,rows,fields){
		if(!!error){
            console.log('Failed to delete');
          }else{
          	console.log('Successful deleted');
          }
	});

	connection.query("SELECT "+
		"pd.id, "+
		"pd.description, "+ 
		"pd.name,"+ 
		"pd.additionalFeatures, "+
		"p.age, p.carrier, p.imageUrl, p.snippet, "+
		"b.standbyTime, "+
		"b.talkTime,b.type, "+
		"a.os,a.ui, "+
		"av.list, "+
		"c.camera_id,c.features, c.primary, "+
		"ct.connectivity_id,ct.bluetooth,ct.cell,ct.gps,ct.infrared,ct.wifi, "+
		"d.display_id,d.screenResolution,d.screenSize,d.touchScreen, "+
		"h.hardware_id, h.accelerometer, h.audioJack, h.cpu,h.fmRadio,h.physicalKeyboard,h.usb,"+
		"i.images_id, i.list, "+
		"sw.size_weight_id,sw.dimensions,sw.weight, "+
		"s.storage_id, s.flash, s.ram "+
		"FROM phonedetail AS pd "+
		"INNER JOIN phone AS p ON p.phone_id=pd.phone_id "+
		"INNER JOIN battery AS b ON b.phone_id=pd.phone_id "+
		"INNER JOIN android AS a ON a.phone_id=pd.phone_id "+
		"INNER JOIN availability AS av ON av.phone_id=pd.phone_id "+
		"INNER JOIN camera AS c ON c.phone_id=pd.phone_id "+
		"INNER JOIN connectivity AS ct ON ct.phone_id=pd.phone_id "+
		"INNER JOIN display AS d ON d.phone_id=pd.phone_id "+
		"INNER JOIN hardware AS h ON h.phone_id=pd.phone_id "+
		"INNER JOIN images AS i ON i.phone_id=pd.phone_id "+
		"INNER JOIN size_weight AS sw ON sw.phone_id=pd.phone_id "+
		"INNER JOIN storage AS s ON s.phone_id=pd.phone_id ", function(error,rows,fields){
		res.end(JSON.stringify(rows));
	});
});

app.get('/crudlist', function(req, res){

	connection.query("SELECT "+
		"pd.id, "+
		"pd.description, "+ 
		"pd.name,"+ 
		"pd.additionalFeatures, "+
		"p.age, p.carrier, p.imageUrl, p.snippet, "+
		"b.standbyTime, "+
		"b.talkTime,b.type, "+
		"a.os,a.ui, "+
		"av.list, "+
		"c.camera_id,c.features, c.primary, "+
		"ct.connectivity_id,ct.bluetooth,ct.cell,ct.gps,ct.infrared,ct.wifi, "+
		"d.display_id,d.screenResolution,d.screenSize,d.touchScreen, "+
		"h.hardware_id, h.accelerometer, h.audioJack, h.cpu,h.fmRadio,h.physicalKeyboard,h.usb,"+
		"i.images_id, i.list, "+
		"sw.size_weight_id,sw.dimensions,sw.weight, "+
		"s.storage_id, s.flash, s.ram "+
		"FROM phonedetail AS pd "+
		"INNER JOIN phone AS p ON p.phone_id=pd.phone_id "+
		"INNER JOIN battery AS b ON b.phone_id=pd.phone_id "+
		"INNER JOIN android AS a ON a.phone_id=pd.phone_id "+
		"INNER JOIN availability AS av ON av.phone_id=pd.phone_id "+
		"INNER JOIN camera AS c ON c.phone_id=pd.phone_id "+
		"INNER JOIN connectivity AS ct ON ct.phone_id=pd.phone_id "+
		"INNER JOIN display AS d ON d.phone_id=pd.phone_id "+
		"INNER JOIN hardware AS h ON h.phone_id=pd.phone_id "+
		"INNER JOIN images AS i ON i.phone_id=pd.phone_id "+
		"INNER JOIN size_weight AS sw ON sw.phone_id=pd.phone_id "+
		"INNER JOIN storage AS s ON s.phone_id=pd.phone_id ", function(error,rows,fields){
		res.end(JSON.stringify(rows));
	});
});

app.post('/update',function(req,res){
  //Phone Detail
  var pdphoneid=req.body.pdphoneid;
  var pdid=req.body.pdid;
  var pddescription=req.body.pddescription;
  var pdname=req.body.pdname;
  var pdadditionalFeatures=req.body.pdadditionalFeatures;
  //Phone
  var page=req.body.page;
  var pcarrier=req.body.pcarrier;
  var pimageUrl=req.body.pimageUrl;
  var psnippet=req.body.psnippet;
  //Battery
  var bstandbyTime=req.body.bstandbyTime;
  var btalkTime=req.body.btalkTime;
  var btype=req.body.btype;
  //Android
  var aos=req.body.aos;
  var aui=req.body.aui;
  //Availability
  var avlist=req.body.avlist;
  //Camera
  var cfeatures=req.body.cfeatures;
  var cprimary=req.body.cprimary;
  //Connectivity
  var ctbluetooth=req.body.ctbluetooth;
  var ctcell=req.body.ctcell;
  var ctgps=req.body.ctgps;
  var ctinfrared=req.body.ctinfrared;
  var ctwifi=req.body.ctwifi;
  //Display
  var dscreenResolution=req.body.dscreenResolution;
  var dscreenSize=req.body.dscreenSize;
  var dtouchScreen=req.body.dtouchScreen;
  //Hardware
  var haccelerometer=req.body.haccelerometer;
  var haudioJack=req.body.haudioJack;
  var hfmRadio=req.body.hfmRadio;
  var hphysicalKeyboard=req.body.hphysicalKeyboard;
  var husb=req.body.husb;
  var hcpu=req.body.hcpu;
  //Image
  var imlist=req.body.imlist;
  //Size and Weight
  var swdimensions=req.body.swdimensions;
  var swweight=req.body.swweight;
  //Storage
  var sflash=req.body.sflash;
  var sram=req.body.sram;

  	var phonedetail = "UPDATE `phonedetail` SET `id` = '"+pdid+"', `description` = '"+pddescription+"', `name` = '"+pdname+"', `additionalFeatures` = '"+pdadditionalFeatures+"' WHERE phone_id = "+pdphoneid;
		connection.query(phonedetail,function(error,rows,fields){
			if(!!error){
				console.log('Error Phone Detail Update');
			}else{
				console.log('Phone Detail Updated:');
			}
	});
	var phone = 'UPDATE `phone` SET `id` = "'+pdid+
	'", `age` = "'+page+
	'", `carrier` = "'+pcarrier+
	'", `imageUrl` = "'+pimageUrl+
	'", `name` = "'+pdname+
	'", `snippet` = "'+psnippet+
	'" WHERE phone_id = '+pdphoneid;
		connection.query(phone,function(error,rows,fields){
		if(!!error){
			console.log('Error Phone Update');
		}else{
			console.log('Phone Updated:');
		}
	});
	var battery = "UPDATE `battery` SET `standbyTime` = '"+bstandbyTime+"', `talkTime` = '"+btalkTime+"', `type` = '"+btype+"' WHERE phone_id = "+pdphoneid;
		connection.query(battery,function(error,rows,fields){
			if(!!error){
				console.log('Error Battery Update');
			}else{
				console.log('Phone Battery Updated:');
			}
	});
	var android = "UPDATE `android` SET `os` = '"+aos+"', `ui` = '"+aui+"' WHERE phone_id = "+pdphoneid;
		connection.query(android,function(error,rows,fields){
			if(!!error){
				console.log('Error Android Update');
			}else{
				console.log('Phone Android Updated:');
			}
	});
	var availability = "UPDATE `availability` SET `list` = '"+avlist+"' WHERE phone_id = "+pdphoneid;
		connection.query(availability,function(error,rows,fields){
			if(!!error){
				console.log('Error Availability Update');
			}else{
				console.log('Phone Availability Updated:');
			}
	});
	var camera = "UPDATE `camera` SET `primary` = '"+cprimary+"', `features` = '"+cfeatures+"' WHERE phone_id = "+pdphoneid;
		connection.query(camera,function(error,rows,fields){
			if(!!error){
				console.log('Error Camera Update');
			}else{
				console.log('Phone Camera Updated:');
			}
	});
	var connectivity = "UPDATE `connectivity` SET `bluetooth` = '"+ctbluetooth+"', `cell` = '"+ctcell+"', `gps` = '"+ctgps+"', `infrared` = '"+ctinfrared+"', `wifi` = '"+ctwifi+"' WHERE phone_id = "+pdphoneid;
		connection.query(connectivity,function(error,rows,fields){
		if(!!error){
			console.log('Error Connectivity Update');
		}else{
			console.log('Phone Connectivity Updated:');
		}
	});
	var display = "UPDATE `display` SET `screenResolution` = '"+dscreenResolution+"', `screenSize` = '"+dscreenSize+"', `touchScreen` = '"+dtouchScreen+"' WHERE phone_id = "+pdphoneid;
		connection.query(display,function(error,rows,fields){
			if(!!error){
				console.log('Error Display Update');
			}else{
				console.log('Phone Display Updated:');
			}
	});
	var hardware = "UPDATE `hardware` SET `accelerometer` = '"+haccelerometer+"', `audioJack` = '"+haudioJack+"', `cpu` = '"+hcpu+"', `fmRadio` = '"+hfmRadio+"', `physicalKeyboard` = '"+hphysicalKeyboard+"', `usb` = '"+husb+"' WHERE phone_id = "+pdphoneid;
		connection.query(hardware,function(error,rows,fields){
		if(!!error){
			console.log('Error Hardware Update');
		}else{
			console.log('Phone Hardware Updated:');
		}
	});
	var images = "UPDATE `images` SET `list` = '"+imlist+"' WHERE phone_id = "+pdphoneid;
		connection.query(images,function(error,rows,fields){
			if(!!error){
				console.log('Error Images Update');
			}else{
				console.log('Phone Images Updated:');
			}
	});
	var size_weight = "UPDATE `size_weight` SET `dimensions` = '"+swdimensions+"', `weight` = '"+swweight+"' WHERE phone_id = "+pdphoneid;
		connection.query(size_weight,function(error,rows,fields){
			if(!!error){
				console.log('Error Size and Weight Update');
			}else{
				console.log('Phone Size and Weight Updated:');
			}
	});
	var storage = "UPDATE `storage` SET `flash` = '"+sflash+"', `ram` = '"+sram+"' WHERE phone_id = "+pdphoneid;
		connection.query(storage,function(error,rows,fields){
			if(!!error){
				console.log('Error Storage Update');
			}else{
				console.log('Phone Storage Updated:');
			}
	});
  //console.log(phone);
});

app.post('/create',function(req,res){
  //Phone Detail
  var pdphoneid=req.body.pdphoneid;
  var pdid=req.body.pdid;
  var pddescription=req.body.pddescription;
  var pdname=req.body.pdname;
  var pdadditionalFeatures=req.body.pdadditionalFeatures;
  //Phone
  var page=req.body.page;
  var pcarrier=req.body.pcarrier;
  var pimageUrl=req.body.pimageUrl;
  var psnippet=req.body.psnippet;
  //Battery
  var bstandbyTime=req.body.bstandbyTime;
  var btalkTime=req.body.btalkTime;
  var btype=req.body.btype;
  //Android
  var aos=req.body.aos;
  var aui=req.body.aui;
  //Availability
  var avlist=req.body.avlist;
  //Camera
  var cfeatures=req.body.cfeatures;
  var cprimary=req.body.cprimary;
  //Connectivity
  var ctbluetooth=req.body.ctbluetooth;
  var ctcell=req.body.ctcell;
  var ctgps=req.body.ctgps;
  var ctinfrared=req.body.ctinfrared;
  var ctwifi=req.body.ctwifi;
  //Display
  var dscreenResolution=req.body.dscreenResolution;
  var dscreenSize=req.body.dscreenSize;
  var dtouchScreen=req.body.dtouchScreen;
  //Hardware
  var haccelerometer=req.body.haccelerometer;
  var haudioJack=req.body.haudioJack;
  var hfmRadio=req.body.hfmRadio;
  var hphysicalKeyboard=req.body.hphysicalKeyboard;
  var husb=req.body.husb;
  var hcpu=req.body.hcpu;
  //Image
  var imlist=req.body.imlist;
  //Size and Weight
  var swdimensions=req.body.swdimensions;
  var swweight=req.body.swweight;
  //Storage
  var sflash=req.body.sflash;
  var sram=req.body.sram;

  	var phonedetail = 'INSERT INTO phonedetail (id, description, name, additionalFeatures) VALUES ("'+
  		pdid+'", "'+pddescription+'", "'+pdname+'", "'+pdadditionalFeatures+'")';
		connection.query(phonedetail,function(error,rows,fields){
			if(!!error){
				console.log('Error Phone Detail Insert');
			}else{
				console.log('Phone Detail Inserted:');
				var phone_id = rows.insertId;
				 
			}

			var phone = 'INSERT INTO phone (phone_id, id, age, carrier, imageUrl, name, snippet) VALUES ("'+
				rows.insertId+'", "'+pdid+'", "'+page+'", "'+pcarrier+'", "'+pimageUrl+'", "'+pdname+'", "'+psnippet+'")';
				
				connection.query(phone,function(error,rows,fields){
						if(!!error){
							console.log('Error Phone Insert');
						}else{
							console.log('Phone Inserted:');
						}
				});
			var android = 'INSERT INTO android (phone_id, os, ui) VALUES ("'+
				rows.insertId+'", "'+aos+'", "'+aui+'")';
				connection.query(android,function(error,rows,fields){
					if(!!error){
						console.log('Error Android Insert');
					}else{
						console.log('Phone Android Inserted:');

					}
			});

			var availability = 'INSERT INTO availability (phone_id, list) VALUES ("'+
			rows.insertId+'", "'+avlist+'")';

				connection.query(availability,function(error,rows,fields){
					if(!!error){
						console.log('Error Availability Insert');
					}else{
						console.log('Phone Availability Inserted:');
					}
			});

			var battery = 'INSERT INTO battery (phone_id, standbyTime, talkTime, type) VALUES ("'+
				rows.insertId+'", "'+bstandbyTime+'", "'+btalkTime+'", "'+btype+'")';
				connection.query(battery,function(error,rows,fields){
					if(!!error){
						console.log('Error Battery Insert');
					}else{
						console.log('Phone Battery Inserted:');
					}
			});

			var camera = 'INSERT INTO `camera` (`phone_id`, `features`, `primary`) VALUES ("'+
				
			rows.insertId+'", "'+cfeatures+'", "'+cprimary+'")';
				connection.query(camera,function(error,rows,fields){
					if(!!error){
						console.log('Error Camera Update');
					}else{
						console.log('Phone Camera Updated:');
					}
			});
			var connectivity = 'INSERT INTO connectivity (phone_id, bluetooth, cell, gps, infrared, wifi) VALUES ("'+
				rows.insertId+'", "'+ctbluetooth+'", "'+ctcell+'", "'+ctgps+'", "'+ctinfrared+'", "'+ctwifi+'")';
				connection.query(connectivity,function(error,rows,fields){
				if(!!error){
					console.log('Error Connectivity Insert');
				}else{
					console.log('Phone Connectivity Inserted:');
				}
			});
			var display = 'INSERT INTO display (phone_id, screenResolution, screenSize, touchScreen) VALUES ("'+
				rows.insertId+'", "'+dscreenResolution+'", "'+dscreenSize+'", "'+dtouchScreen+'")';
				connection.query(display,function(error,rows,fields){
						if(!!error){
							console.log('Error Display Insert');
						}else{
							console.log('Phone Display Inserted:');
						}
			});

			var hardware = 'INSERT INTO hardware (phone_id, accelerometer, audioJack, cpu, fmRadio, physicalKeyboard, usb) VALUES ("'+
				rows.insertId+'", "'+haccelerometer+'", "'+haudioJack+'", "'+hcpu+'", "'+hfmRadio+'", "'+hphysicalKeyboard+'", "'+husb+'")';
				connection.query(hardware,function(error,rows,fields){
				if(!!error){
					console.log('Error Hardware Insert');
				}else{
					console.log('Phone Hardware Inserted:');
				}
			});

			var images = 'INSERT INTO images (phone_id, list) VALUES ("'+
				rows.insertId+'", "'+imlist+'")';
				connection.query(images,function(error,rows,fields){
					if(!!error){
						console.log('Error Images Insert');
					}else{
						console.log('Phone Images Inserted:');
					}
			});

			var size_weight = 'INSERT INTO size_weight (phone_id, dimensions, weight) VALUES ("'+
				rows.insertId+'", "'+swdimensions+'", "'+swweight+'")';
				connection.query(size_weight,function(error,rows,fields){
					if(!!error){
						console.log('Error Size and Weight Insert');
					}else{
						console.log('Phone Size and Weight Inserted:');
					}
			});

			var storage = 'INSERT INTO storage ( phone_id, flash, ram) VALUES ("'+
				rows.insertId+'", "'+sflash+'", "'+sram+'")';
				connection.query(storage,function(error,rows,fields){
					if(!!error){
						console.log('Error Storage Insert');
					}else{
						console.log('Phone Storage Inserted:');
					}
			});


	});	

	
		
	
		
  //console.log(phonedetail);
});
var port = 3000;
app.listen(port);
console.log("Server running on "+port);
