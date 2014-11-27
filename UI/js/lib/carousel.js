define(["./util", "./eventcenter"], function(Util, EventCenter){
    var Carousel = function(id, images, srcs){
      var self = this,
          carouselDiv = document.getElementById(id);
          
      
      self.ele = carouselDiv;
      self.current = 0;
      self.pre = 0;
     
      var imagesStr = "<div id=\"images\">",
          indicatorStr = "<div id=\"indicator\">";

      for(var i=0; i<images.length; i++){
        imagesStr += "<a target=\"_blank\" href=\"" + srcs[i] + "\">";
        imagesStr += "<img src=\"" + images[i] + "\"/>";
        imagesStr += "</a>";

        indicatorStr = indicatorStr + (i==0 ? "<a class=\"active\" target=\"_blank\" href=\"" + srcs[i] + "\">" : "<a target=\"_blank\" href=\"" + srcs[i] + "\">");
        indicatorStr = indicatorStr + (i==0 ? "<div class=\"indicator-bg active\"></div>" : "<div class=\"indicator-bg\"></div>");
        indicatorStr += "<img src=\"" + images[i] + "\"/>";
        indicatorStr += "</a>";
      }

      imagesStr += "</div>";
      indicatorStr += "</div>";

      carouselDiv.innerHTML = imagesStr + indicatorStr;

      var slideImages = document.getElementById("images").children,
          indicatorImages = document.getElementById("indicator").children;

      self.indicators = indicatorImages;
      self.imgs = slideImages;
    };

  Util.extendObj(Carousel, EventCenter);

  Carousel.prototype.init = function(){
      var self = this;
      self.imgs[self.current].style.display = "block";
      self.imgs[self.current].style.opacity = 1;
      self.imgs[self.current].opacity = 1;
      for(var i=0; i<self.indicators.length; i++){
          self.indicators[i].onmouseover = (function(i){
            return function(e){
              /*事件的各种target ： http://www.w3school.com.cn/jsref/dom_obj_event.asp*/
              if(!Util.isAncestor(e.relatedTarget, e.currentTarget) && (e.relatedTarget != e.currentTarget)){
                self.trigger("mouseover", e.currentTarget);
                var slideTimer = setTimeout(function(){
                  self.slideTo(i);
                }, 300);
                self.stopAutoSlide();
                self.indicators[i].onmouseout = function(e){
                  if(!Util.isAncestor(e.relatedTarget, e.currentTarget) && (e.relatedTarget != e.currentTarget)){
                    self.trigger("mouseout", e.currentTarget);
                    clearTimeout(slideTimer);
                    self.autoSlide();
                  }
                };
              }
            };
          })(i);

      }
    };

  Carousel.prototype.nextSlide = function(){
    var self = this,
        next = 0;
    if(self.current >= (self.imgs.length -1)){
      next = 0;
    }else{
      next = self.current + 1;
    }
    self.slideTo(next);
  };

  Carousel.prototype.slideTo = function(num){
    var self = this;
    if(self.current != num){
      self.trigger("slide");
      self.pre = self.current;
      self.current = num;
      self.imgs[self.current].style.display = "block";
      self.imgs[self.current].style.opacity = 0;
      self.imgs[self.current].opacity = 0;
      var fadeInTimer = setInterval(function(){
        if(self.imgs[self.current].opacity < 1){
          self.imgs[self.current].opacity += 0.1;
          self.imgs[self.current].style.opacity = self.imgs[self.current].opacity;  
        }else{
          clearInterval(fadeInTimer);
        }
      }, 200);
      var fadeOutTimer = setInterval(function(){
        if(self.imgs[self.pre].opacity >= 0){
          self.imgs[self.pre].opacity -= 0.4;
          self.imgs[self.pre].style.opacity = self.imgs[self.pre].opacity;  
        }else{
          self.imgs[self.pre].opacity = 0;
          self.imgs[self.pre].style.opacity = self.imgs[self.pre].opacity;
          self.imgs[self.pre].style.display = "none";
          clearInterval(fadeOutTimer);
        }
      }, 200);
      var target = self.indicators[num];
      if(!Util.hasClass(target, "active")){
        for(var k=0; k<self.indicators.length; k++){
          if(k != num && Util.hasClass(self.indicators[k], "active")){
            Util.removeClass(self.indicators[k], "active");
          }
        }
        Util.addClass(self.indicators[num], "active");
      }
    
    }
           
  };

  Carousel.prototype.stopAutoSlide = function(){
    var self = this;
    if(self.autoSlideTimer){
      clearInterval(self.autoSlideTimer);
      delete self.autoSlideTimer;
    }
  };

  Carousel.prototype.autoSlide = function(){
    var self = this;
    var autoSlideTimer = setInterval(function(){
      self.nextSlide.call(self);
    }, 5000);
    self.autoSlideTimer = autoSlideTimer;
  };
  return Carousel;
});

