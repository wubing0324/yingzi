/*
common
*/

var _main;

var Main = ( function()
{
	function Main()
	{
		this._threeMain;
		this._canvasBg;
		this._cover;
		
		this.isCover = true;


		this._worksList = [
		[ "box26", "/common/img/works/texture26.jpg", "/common/img/works/text26.png", "/projects/5572320/" ],
		[ "box25", "/common/img/works/texture25.jpg", "/common/img/works/text25.png", "/projects/acsl/" ],
		[ "box24", "/common/img/works/texture24.jpg", "/common/img/works/text24.png", "/projects/murakami-firm/" ],
		[ "box23", "/common/img/works/texture23.jpg", "/common/img/works/text23.png", "/projects/estima-wondermap/" ],
		[ "box22", "/common/img/works/texture22.jpg", "/common/img/works/text22.png", "/projects/estima-sense-of-wonder/" ],
		[ "box21", "/common/img/works/texture21.jpg", "/common/img/works/text21.png", "/projects/monami/" ],
		[ "box20", "/common/img/works/texture20.jpg", "/common/img/works/text20.png", "/projects/pocasha/" ],
		[ "box19", "/common/img/works/texture19.jpg", "/common/img/works/text19.png", "/projects/er-gn-hiwa/" ],
		[ "box18", "/common/img/works/texture18.jpg", "/common/img/works/text18.png", "/projects/akb-10th-anniversary/" ],
		[ "box17", "/common/img/works/texture17.jpg", "/common/img/works/text17.png", "/projects/touch-the-heart/" ],
		[ "box16", "/common/img/works/texture16.jpg", "/common/img/works/text16.png", "/projects/message-design-center/" ],
		/*[ "box15", "/common/img/works/texture15.jpg", "/common/img/works/text15.png", "/projects/naxis/" ],
		[ "box14", "/common/img/works/texture14.jpg", "/common/img/works/text14.png", "/projects/still-i-nikoand/" ],
		[ "box13", "/common/img/works/texture13.jpg", "/common/img/works/text13.png", "/projects/cledepeau-2015aw/" ],
		[ "box12", "/common/img/works/texture12.jpg", "/common/img/works/text12.png", "/projects/kochike2015/" ],
		[ "box11", "/common/img/works/texture11.jpg", "/common/img/works/text11.png", "/projects/fact/" ],
		[ "box10", "/common/img/works/texture10.jpg", "/common/img/works/text10.png", "/projects/thisisjapan/" ],
		[ "box1", "/common/img/works/texture9.jpg", "/common/img/works/text9.png", "/projects/cledepeau-2014aw/" ],
		[ "box2", "/common/img/works/texture8.jpg", "/common/img/works/text8.png", "/projects/daisukekobayashi/" ],
		[ "box9", "/common/img/works/texture7.jpg", "/common/img/works/text7.png", "/projects/pg-bold-cinderella/" ],
		[ "box4", "/common/img/works/texture6.jpg", "/common/img/works/text6.png", "/projects/medical-youkai/" ],
		[ "box5", "/common/img/works/texture5.jpg", "/common/img/works/text5.png", "/projects/haneda-voices/" ],
		[ "box6", "/common/img/works/texture4.jpg", "/common/img/works/text4.png", "/projects/mikaforshu/" ],
		[ "box7", "/common/img/works/texture3.jpg", "/common/img/works/text3.png", "/projects/asiacross/" ],
		[ "box8", "/common/img/works/texture2.jpg", "/common/img/works/text2.png", "/projects/omotesundo/" ],
		[ "box9", "/common/img/works/texture1.jpg", "/common/img/works/text1.png", "/projects/makers-base/" ]*/
		];
		
		this._modelCount = 0;
		
		
		window.onload = function()
		{
			_main.onLoad();
		}
	}


	Main.prototype.onLoad = function()
	{
		//var _ref = document.referrer;
		//console.log( "_ref:" + _ref );
	
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		window.scrollTo(0, 0);
		document.getElementById( "container" ).style.visibility = "hidden";
		document.getElementById( "container" ).style.top = "300px";
		document.getElementById( "container" ).style.opacity = "0";
	
		document.getElementById( "header" ).style.visibility = "hidden";
		document.getElementById( "copyright" ).style.visibility = "hidden";
		
		if( _device != "PC" )
		{
			document.getElementById( "copyright" ).style.display = "none";
		}
		else
		{
			document.getElementById( "copyright_d" ).style.display = "none";
		}

	
		if( document.referrer.indexOf( "http://homunculus" ) != -1 ||
			document.referrer.indexOf( "https://homunculus" ) != -1 ||
			document.referrer.indexOf( "http://rn2014.homunculus" ) != -1 ||
			document.referrer.indexOf( "http://stage.homunculus.jp" ) != -1 ||
			document.referrer.indexOf( "http://localhost:3000" ) != -1 )
		{
			this.isCover = false;
		}
		else
		{
			//cover
			this.isCover = true;
			this._cover = new CanvasCover( "cover" );
			
			//this.isCover = false;
		}
		
		//bg
		this._canvasBg = new CanvasBg( "bg", false );
	
		//tjree.js
		this._threeMain = new THREEMain( );
	
		//カセット生成
		for( var i = 0; i < this._worksList.length; i++ )
		{
			this._threeMain.create( this._worksList[i][0],this._worksList[i][1],this._worksList[i][2],this._worksList[i][3] );
		}
	
	
		if( navigator.userAgent.indexOf("Mac") == -1 )
		{
			setScrroll( );
		}
	
		setPageTop();
	
		window.onresize = function(e)
		{
			onResize( );
		}
	
	
		if( !this.isCover )
		{
			var _child = document.getElementById( "cover" );
			document.body.removeChild( _child );
			
			document.body.style.overflow = "auto";
			document.body.style.position = "static";
			window.scrollTo(0, 0);
			document.getElementById( "header" ).style.visibility = "visible";
			document.getElementById( "copyright" ).style.visibility = "visible";
		}
		
		
		//LOADING ADD
		this.addLoadind();
		
		window.onunload = function()
		{
		}
	}
	
	
	
	/*-------------------------------------------------------------------------
	COVER CLEAR
	*/
	Main.prototype.clearCover = function()
	{
		this.xAllReady();
		
		var _this = this;
		
		$( '#cover' ).animate({
			top: ( window.innerHeight* -1 - 100 ),
		}, 650, 'easieEaseOutCubic', _this.clearCoverComp );

		H3D.index.stop();
	}
	
	Main.prototype.clearCoverComp = function()
	{
		//console.log( "ccc:" + _main._cover );
		_main._cover.clearCover();
		var _child = document.getElementById( "cover" );
		document.body.removeChild( _child );
		_main.xAllStart();

		H3D.index.destroy();
	}



	/*------------------------------------------------------------------------
	START
	*/
	Main.prototype.xAllReady = function()
	{
		document.body.style.overflow = "auto";
		document.body.style.position = "static";
		document.getElementById( "container" ).style.visibility = "visible";
		document.getElementById( "header" ).style.visibility = "visible";
		document.getElementById( "copyright" ).style.visibility = "visible";
	
		//
		$( '#container' ).animate({
			top:'120px',
			opacity: 1
		}, 600, 'easieEaseOutCubic' );
		
		window.scrollTo(0, 0);
	}



	Main.prototype.xAllStart = function()
	{
		this._threeMain.start();
		this._canvasBg.start();
	}
	
	
	//-------------------------------------------------------------------------------
	
	/*
	worksモデルが生成されたら呼ばれる
	threeMainから
	*/
	Main.prototype.modelComp = function()
	{	
		this._modelCount++;
		
		if( this._modelCount >= this._worksList.length )
		{	
			this._timer = setTimeout( _main.modelCompTimer, 1000 );
		}
	}
	
	Main.prototype.modelCompTimer = function()
	{	
		clearTimeout( _main._timer );
		
		if( _main.isCover )
		{
			//coverあり
			_main._cover.start();
		}
		else
		{
			//coverなし
			_main.xAllReady();
			_main.xAllStart();
			//LOADING REMOVE
			_main.removeLoading();
		}
	}



	/*
	LOADING-----------------------------------------------------------------------
	*/

	Main.prototype.addLoadind = function()
	{
		var _elm = document.createElement('div');
		_elm.id = "loading";
		_elm.innerHTML = "<img src='/common/img/loading.gif'>"
		document.body.appendChild( _elm );
	}


	Main.prototype.removeLoading = function()
	{
		if( document.getElementById( "loading" ) != null );
		{
			$( '#loading' ).animate({
				opacity: 0
			}, 300, 'easieEaseOutCubic', _main.removeLoadingComp );
		}
	}
	
	
	Main.prototype.removeLoadingComp = function()
	{
		var _child = document.getElementById( "loading" );
		document.body.removeChild( _child );
	}



	return Main;
		
})();


_main = new Main();



