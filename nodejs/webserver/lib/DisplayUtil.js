var fs = require("fs");
var Path = require("path");
var exec = require("child_process").exec;

var Display = {

	displayFile : function(pathInfo, res){
	//http content-type的对照表 http://tool.oschina.net/commons
		var miniTypes = {
			ez : "application/andrew-inset",
			hqx : "application/mac-binhex40",
			cpt : "application/mac-compactpro",
			doc : "application/msword",
			bin : "application/octet-stream",
			dms : "application/octet-stream",
			lha : "application/octet-stream",
			lzh : "application/octet-stream",
			exe : "application/octet-stream",
			so : "application/octet-stream",
			dll : "application/octet-stream",
			oda : "application/oda",
			pdf : "application/pdf",
			ai : "application/postscript",
			eps : "application/postscript",
			ps : "application/postscript",
			smi : "application/smil",
			smil : "application/smil",
			mif : "application/vnd.mif",
			xls : "application/vnd.ms-excel",
			ppt : "application/vnd.ms-powerpoint",
			wbxml : "application/vnd.wap.wbxml",
			wmlc : "application/vnd.wap.wmlc",
			wmlsc : "application/vnd.wap.wmlscriptc",
			bcpio : "application/x-bcpio",
			vcd : "application/x-cdlink",
			pgn : "application/x-chess-pgn",
			cpio : "application/x-cpio",
			csh : "application/x-csh",
			dcr : "application/x-director",
			dir : "application/x-director",
			dxr : "application/x-director",
			dvi : "application/x-dvi",
			spl : "application/x-futuresplash",
			gtar : "application/x-gtar",
			hdf : "application/x-hdf",
			js : "text/javascript",
			skp : "application/x-koan",
			skd : "application/x-koan",
			skt : "application/x-koan",
			skm : "application/x-koan",
			latex : "application/x-latex",
			nc : "application/x-netcdf",
			cdf : "application/x-netcdf",
			sh : "application/x-sh",
			shar : "application/x-shar",
			swf : "application/x-shockwave-flash",
			sit : "application/x-stuffit",
			sv4cpio : "application/x-sv4cpio",
			sv4crc : "application/x-sv4crc",
			tar : "application/x-tar",
			tcl : "application/x-tcl",
			tex : "application/x-tex",
			texinfo : "application/x-texinfo",
			texi : "application/x-texinfo",
			t : "application/x-troff",
			tr : "application/x-troff",
			roff : "application/x-troff",
			man : "application/x-troff-man",
			me : "application/x-troff-me",
			ms : "application/x-troff-ms",
			ustar : "application/x-ustar",
			src : "application/x-wais-source",
			xhtml : "application/xhtml+xml",
			xht : "application/xhtml+xml",
			zip : "application/zip",
			au : "audio/basic",
			snd : "audio/basic",
			mid : "audio/midi",
			midi : "audio/midi",
			kar : "audio/midi",
			mpga : "audio/mpeg",
			mp2 : "audio/mpeg",
			mp3 : "audio/mpeg",
			aif : "audio/x-aiff",
			aiff : "audio/x-aiff",
			aifc : "audio/x-aiff",
			m3u : "audio/x-mpegurl",
			ram : "audio/x-pn-realaudio",
			rm : "audio/x-pn-realaudio",
			rpm : "audio/x-pn-realaudio-plugin",
			ra : "audio/x-realaudio",
			wav : "audio/x-wav",
			pdb : "chemical/x-pdb",
			xyz : "chemical/x-xyz",
			bmp : "image/bmp",
			gif : "image/gif",
			ief : "image/ief",
			jpeg : "image/jpeg",
			jpg : "image/jpeg",
			jpe : "image/jpeg",
			png : "image/png",
			tiff : "image/tiff",
			tif : "image/tiff",
			djvu : "image/vnd.djvu",
			djv : "image/vnd.djvu",
			wbmp : "image/vnd.wap.wbmp",
			ras : "image/x-cmu-raster",
			pnm : "image/x-portable-anymap",
			pbm : "image/x-portable-bitmap",
			pgm : "image/x-portable-graymap",
			ppm : "image/x-portable-pixmap",
			rgb : "image/x-rgb",
			xbm : "image/x-xbitmap",
			xpm : "image/x-xpixmap",
			xwd : "image/x-xwindowdump",
			igs : "model/iges",
			iges : "model/iges",
			msh : "model/mesh",
			mesh : "model/mesh",
			silo : "model/mesh",
			wrl : "model/vrml",
			vrml : "model/vrml",
			css : "text/css",
			html : "text/html",
			htm : "text/html",
			asc : "text/plain",
			txt : "text/plain",
			rtx : "text/richtext",
			rtf : "text/rtf",
			sgml : "text/sgml",
			sgm : "text/sgml",
			tsv : "text/tab-separated-values",
			wml : "text/vnd.wap.wml",
			wmls : "text/vnd.wap.wmlscript",
			etx : "text/x-setext",
			xsl : "text/xml",
			xml : "text/xml",
			mpeg : "video/mpeg",
			mpg : "video/mpeg",
			mpe : "video/mpeg",
			qt : "video/quicktime",
			mov : "video/quicktime",
			mxu : "video/vnd.mpegurl",
			avi : "video/x-msvideo",
			movie : "video/x-sgi-movie",
			ice : "x-conference/x-cooltalk"
		};
		if(pathInfo.ext == "php"){
			exec("php " + pathInfo["path"], function(error, result){
				if(error){
					res.writeHead(500);
					res.write(error);
					res.end();
				}else{
					res.writeHead(200, {
						"Content-Type" : "text/plain"
					});
					res.write(result);
					res.end();
				}
			});
		}else{
			var contentType = "application/octet-stream";
			if(miniTypes[pathInfo.ext]){
				contentType = miniTypes[pathInfo.ext];
			}
			res.writeHead(200, {
				"Content-Type" : contentType
			});

			/* 不建议直接使用readFileSync ： 
				1. 文件直接读取在内存中，对于大文件占用内存过多，导致内存泄露，尤其是当低网速的情况下
				2. 采用stream读写，以chunk方式输出，效率更好，速度更快
				3. 监听drain事件当防止读速度远大于写速度时内容丢失的情况*/
			var readStream = fs.createReadStream(pathInfo["path"]);
			readStream.on("data", function(chunk){
				if(res.write(chunk) === false){
					readStream.pause();
				}
			});
			res.on("drain", function(){
				readStream.resume();
			});
			readStream.on("end", function(){
				res.end();
			});	
			/*pipe自动会处理readableStream的data和end事件
			fs.createReadStream(pathInfo["path"]).pipe(res);*/
		}	
	},
	displayDirectory : function(pathInfo, res){
		var files = fs.readdirSync(pathInfo["path"]);
		var htmlStr = "<ul>";
		for(var i=0; i<files.length; i++){
			var filepath = "/" + pathInfo["subpath"] + "/" + files[i];
			var href = Path.normalize(filepath);
			htmlStr += "<li><a href=\"" + href + "\">" + files[i] + "</a></li>";
		}
		htmlStr += "</ul>";
		res.writeHead(200, {
			"Content-Type" : "text/html"
		});
		res.write(htmlStr);
		res.end();
	}
}

module.exports = Display;