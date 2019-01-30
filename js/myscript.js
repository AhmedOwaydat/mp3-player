$(function(){
   
   'use strict';

    //$('body').width($(window).width());
                /*  scroll  */
    $("body").niceScroll({
        cursorcolor:"#F7600E",
        cursorwidth:"10px"
    });

     $('.player').css("maxWidth", $(window).width()-15);
     $('.player').css("height", $(window).height());
     //$('.header').css("maxWidth", $(window).width());
    $(window).resize(function() {
        $('.player').css("maxWidth", $(window).width()-15);
        $('.player').css("height", $(window).height());
        //$('.header').css("maxWidth", $(window).width());
    });
    
    //$('.header').height($(window).height());

                /* player */
                /* play */
    $('.fa-play').click(function() {
        $(this).addClass('hidden').fadeOut(200, function() {
           $('.pause').removeClass('hidden').css("display", "inline-block");    
        });
        document.getElementById('myPlayer').play();
    });

                        /* pause */
    $('.pause').click(function() {
        $(this).addClass('hidden').fadeOut(200, function() {
           $('.fa-play').removeClass('hidden').css("display", "inline-block");    
        });
        document.getElementById('myPlayer').pause();
    });

                            /*vol mute*/
    $('.fa-volume-off').click(function() {
        document.getElementById('myPlayer').volume=0;
    });

                            /*vol up*/
    $('.fa-volume-up').click(function() {
        document.getElementById('myPlayer').volume+=0.1;
    });

                             /*vol down*/
    $('.fa-volume-down').click(function() {
        document.getElementById('myPlayer').volume-=0.1;
    });

                             /*foward*/
    $('.fa-forward').click(function() {

        $('.musicList .list ul .active').each(function(){
            if(!$(this).is(':last-child')) {
                $(this).removeClass('active').next().addClass('active');
            }
            else{
                $('.musicList .list ul li:first').addClass('active');
                $(this).removeClass('active');
            }
        });

        var $myurl;
        $myurl = $('.musicList .list ul .active').attr('url');
        var $myoudio = document.getElementById('myPlayer');
        $myoudio.src = $myurl;
        $myoudio.autoplay = true;
        $myoudio.load();
        $('.fa-play').addClass('hidden').fadeOut(200, function() {
           $('.pause').removeClass('hidden').css("display", "inline-block");    
        });
    });
                         /*backward*/
    $('.fa-backward').click(function() {
        var $myurl;

        $('.musicList .list ul .active').each(function(){
            if(!$(this).is(':first-child')) {
                $(this).removeClass('active').prev().addClass('active');
            }
            else{
                $('.musicList .list ul li:last').addClass('active');
                $(this).removeClass('active');
            }
        });
        
        $myurl = $('.musicList .list ul .active').attr('url');
        var $myoudio = document.getElementById('myPlayer');
        $myoudio.src = $myurl;
        $myoudio.autoplay = true;
        $myoudio.load();
        $('.fa-play').addClass('hidden').fadeOut(200, function() {
           $('.pause').removeClass('hidden').css("display", "inline-block");    
        });
    });


                    /* timer */
    window.setInterval(function() {

                            /* set timer */
        var $myoudio = document.getElementById('myPlayer');
        var m = $myoudio.currentTime/60;
        var s = $myoudio.currentTime%60;
        if(m<1){
          m=0;
        }

        var tm = $myoudio.duration/60;
        var ts = $myoudio.duration%60;

        $('.curTime').text(Math.floor(m) +' : '+ Math.floor(s));
        $('.totalTime').text(Math.floor(tm) +' : '+ Math.round(ts));
        
                                /* set seeking bar */
        $('.seekBar').css("width",($myoudio.currentTime/$myoudio.duration)*100+'%');

                                /* when track ended */
        if($myoudio.ended){
            $('.musicList .list ul .active').each(function(){
                if(!$(this).is(':last-child')) {
                    $(this).removeClass('active').next().addClass('active');
                }
                else{
                    $('.musicList .list ul li:first').addClass('active');
                    $(this).removeClass('active');
                }
            });

            var $myurl;
            $myurl = $('.musicList .list ul .active').attr('url');
            $myoudio.src = $myurl;
            $myoudio.autoplay = true;
            $myoudio.load();
            $('.fa-play').addClass('hidden').fadeOut(200, function() {
               $('.pause').removeClass('hidden').css("display", "inline-block");    
            });
        }
    }, 1000)

    //click on track
    $('.musicList .list ul li').click(function() {
        $('.musicList .list ul .active').removeClass('active');
        $(this).addClass('active');
        var $myurl;
        $myurl = $('.musicList .list ul .active').attr('url');
        var $myoudio = document.getElementById('myPlayer');
        $myoudio.src = $myurl;
        $myoudio.autoplay = true;
        $myoudio.load();
        $('.fa-play').addClass('hidden').fadeOut(200, function() {
           $('.pause').removeClass('hidden').css("display", "inline-block");    
        });
    });
  
                            /* track seek on click */
    var myBar = document.getElementById('seekBar');
    myBar.addEventListener('click', barClicked, false);

    function barClicked(e) {
        var $myoudio = document.getElementById('myPlayer');
        var $mouseX = e.pageX - $('.seekBar').offset().left;
        var $newtime = ($mouseX*$myoudio.duration)/$('#seekBar').width();
        $myoudio.currentTime = Math.floor($newtime) ;
        $('.seekBar').css("width", $mouseX)
    };
        
});