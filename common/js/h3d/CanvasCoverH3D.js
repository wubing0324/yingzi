/*
COVER
top.jsで生成
*/


CanvasCover = ( function()
{
	function CanvasCover( _id )
	{
		this.isWebGL = false;
		
		this._id = _id;
		
		this.isAction = false;

	}
	
		
	/*
	START
	_mainから
	*/
	CanvasCover.prototype.start = function()
	{
		this.isAction = true;

		if(!CanvasDetector.canWebGL() )
		{
			this.isWebGL = false;

			//logo
			this.createLogo();

			//LOADING REMOVE
			_main.removeLoading();
		}
		else
		{
			this.isWebGL = true;
			
			//3dwrapper
			this.create3D();
		}
	}
	
	
	
	/*
	CREATE LOGO
	3D生成後
	*/
	CanvasCover.prototype.createLogo = function()
	{
		this._logoWrapper = document.createElement( "div" );
		this._logoWrapper.id = "logoWrapper";
		this._logoWrapper.style.top = "-20px";
		this._logoWrapper.style.position = "absolute";
		this._logoWrapper.style.width = "100%";
		this._logoWrapper.style.height = "100%";
		document.getElementById( this._id ).appendChild( this._logoWrapper );
		this._logoWrapper.style.opacity = 0;
		
		
		//logo img
		this._logo = document.createElement( "div" );
		this._logo.id = "coverLogo";
		this._logo.style.position = "absolute";
		this._logo.style.width = "600px";
		this._logo.style.height = "106px";
		this._logo.style.top = "50%";
		this._logo.style.left = "50%";
		this._logo.style.marginLeft = "-300px";
		this._logo.style.marginTop = "-53px";
		this._logoWrapper.appendChild( this._logo );
		
		var _this = this;
		var _img = document.createElement( "img" );
		_img.src = "common/img/coverBg/coverLogo.png";
		
		_img.onload = function( e )
		{
			_this.setImageLogo( e );
		}
	}
	
	
	CanvasCover.prototype.setImageLogo = function( e )
	{
		var _img = e.target;
		this._logo.appendChild( _img );
		
		this._startBtn = document.createElement( "div" );
		this._startBtn.id = "coverStart";
		this._startBtn.style.position = "absolute";
		this._startBtn.style.width = "152px";
		this._startBtn.style.height = "122px";
		this._startBtn.style.top = "100%";
		this._startBtn.style.left = "50%";
		this._startBtn.style.marginLeft = "-76px";
		this._startBtn.style.marginTop = "-122px";
		this._logoWrapper.appendChild( this._startBtn );
		
		var _this = this;
		var _img = document.createElement( "img" );
		_img.src = "common/img/coverBg/clickStart.png";
		
		_img.onload = function( e )
		{
			_this.setImageStart( e );
		}
	}
	
	CanvasCover.prototype.setImageStart = function( e )
	{
		var _img = e.target;
		this._startBtn.appendChild( _img );
		
		//logo表示
		var _this = this;
		
		$( _this._logoWrapper ).animate({
		opacity: 1,
		top: 0,
		}, 1000, 'easieEaseOutCubic', function(){ _this.animationStart() } );
	}

	
	/*
	CREATE 3D
	*/
	CanvasCover.prototype.create3D = function()
	{
		this._canvas = document.createElement( 'div' );
		this._canvas.id = "worldWrapper";
		this._canvas.style.position = "absolute";
		this._canvas.style.top = "0px";
		this._canvas.style.left = "0px";
		document.getElementById( this._id ).appendChild( this._canvas );

		var _this = this;
		H3D.index.init(this._canvas);
		H3D.index.$o.bind("ready", function() {
			//logo
			_this.createLogo();
			//LOADING REMOVE
			_main.removeLoading();
		});
		H3D.index.load();
	}
	
	
	
	/*
	ANIMATION START
	*/
	CanvasCover.prototype.animationStart = function()
	{
		var _this = this;
		
		if( _this.isWebGL )
		{
			H3D.index.start();
			$(this._canvas).find("canvas").css({ opacity:0 }).animate({ opacity:1 }, 700);
		}

		//
		//click test
		this._logoWrapper.addEventListener( "click", function(e){
			_this.bgClick( e );
		} );
	}
	
	
	/*
	BG CLICK------------------------------------------------------------------------------
	*/
	CanvasCover.prototype.bgClick = function( e )
	{	
		this._logoWrapper.removeEventListener( "click", function(e){
			_this.bgClick( e );
		} );
		
		_main.clearCover();
	}

	/*
	CLEAR
	*/
	CanvasCover.prototype.clearCover = function()
	{
		isAction = false;
	}

	
	return CanvasCover;
		
} )();





