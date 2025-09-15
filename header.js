//import jQuery from 'jquery';
class Header {
    constructor() {
        if(ootlahData.page!="checkout" && ootlahData.page!="login"){
            this.headerNav = document.querySelector(".navbar");
            this.headerNavMobile = document.querySelector("#mobile-header");
            this.events()
        }

        setTimeout(function(){
            jQuery('#pop-footer').animate({ bottom: "0%" }, 500);
        },5000);
    }

    events() {
        //this.header.addEventListener("click", () => this.openMenu())
        jQuery(window).scroll(this.updateHeaderBg.bind(this,this.headerNav,this.headerNavMobile));
        jQuery('#currency-selection-menu').on("click",'input[name="currency"]',this.updateCurrency.bind(this));
        jQuery('#menu-icon').on("click",this.showMobileMenu.bind(this));
        jQuery('#btn-user-profile-icon').on("click",this.showMobileUserMenu.bind(this));
        jQuery('#back-menu-mobile').on("click",this.hideMobileMenu.bind(this));
        jQuery('#back-user-menu-mobile').on("click",this.hideMobileUserMenu.bind(this));
        jQuery('.country-menu-ul').on("mouseover",'li>a',this.showCities.bind(this));
        jQuery('.back-to-main-menu-mobile').on("click",this.mobileBackMainMenu.bind(this));
        jQuery('.mobile-sub-selection').on("click",this.mobileSubSections.bind(this));
        jQuery('#btn-mobile-search-icon').on("click",this.showMobileSearch.bind(this));
        jQuery('#back-search-mobile').on("click",this.hideMobileSearch.bind(this));
        jQuery('#menu-mobile-location').on("click",this.showMobileLocation.bind(this));
        jQuery('#back-location-mobile').on("click",this.hideMobileLocation.bind(this));  
        jQuery('#close-pop-footer').on("click",this.hidePopFooter.bind(this)); 
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    hidePopFooter(e){
        jQuery('#pop-footer').animate({ bottom: "-100%" }, 500);
        this.setCookie("popfooter", 1, 30); // expire in 30 days
    }

    showMobileLocation(e){
        jQuery("body").css("overflow", "hidden");
        jQuery('#region-mobile-menu-container').children().appendTo('#locations-mobile-section-container');
        jQuery("#mobile-location-modal").fadeIn(100);
        jQuery("#mobile-location-modal").animate({ top: "0%" }, 300);
    }

    hideMobileLocation(e){
        jQuery("body").css("overflow", "auto");
        jQuery('#locations-mobile-section-container').children().appendTo('#region-mobile-menu-container');
        jQuery("#mobile-location-modal").animate({ top: "-100%" }, 300);
        setTimeout(function(){
            jQuery("#mobile-location-modal").hide();
        },300);
    }

    showMobileSearch(e){
        jQuery('#search-header').children().appendTo('#search-mobile-section-container');
        jQuery("#mobile-search-modal").fadeIn(100);
        jQuery("#mobile-search-modal").animate({ right: "0%" }, 300);
    }

    hideMobileSearch(e){
        jQuery("#mobile-search-modal").animate({ right: "-100%" }, 300);
        setTimeout(function(){
            jQuery("#mobile-search-modal").hide();
        },300);
    }

    mobileSubSections(e){
        var thisBtn = jQuery(e.target);
        var idSection = thisBtn.data("section");
        jQuery("#main-mobile-menu").animate({ left: "-100%" }, 300);
        jQuery("#"+idSection).animate({ right: "0%" }, 300);
    }
    mobileBackMainMenu(e){
        jQuery("#main-mobile-menu").animate({ left: "0%" }, 300);
        jQuery(".mobile-sub-menu-section").animate({ right: "-100%" }, 300);
    }

    showMobileMenu(e){
        jQuery("#mobile-menu-modal").fadeIn(100);
        jQuery("#mobile-menu-modal").animate({ left: "0%" }, 300);
        jQuery("body").css("overflow", "hidden");
    }

    hideMobileMenu(e){
        jQuery("#mobile-menu-modal").animate({ left: "-100%" }, 300);
        jQuery("body").css("overflow", "auto");
        setTimeout(function(){
            jQuery("#mobile-menu-modal").hide();
        },300);
    }

    showMobileUserMenu(e){
        jQuery("#mobile-user-menu-modal").fadeIn(100);
        jQuery("#mobile-user-menu-modal").animate({ right: "0%" }, 300);
        jQuery("body").css("overflow", "hidden");
        
    }

    hideMobileUserMenu(e){
        jQuery("#mobile-user-menu-modal").animate({ right: "-100%" }, 300);
        jQuery("body").css("overflow", "auto");
        setTimeout(function(){
            jQuery("#mobile-user-menu-modal").hide();
        },300);
    }

    showCities(e){
        var countryLink = jQuery(e.target);
        var id = countryLink.data("id");
        jQuery('.country-cities-menu').hide();
        jQuery('#country-cities-menu-'+id).show();
        jQuery('.country-menu-ul').find('li>a').removeClass("active");
        countryLink.addClass("active");
    }

    updateHeaderBg(e,headerNav,headerNavMobile) {
        var thisBody = jQuery(e.target);
        if(ootlahData.page=="home" || ootlahData.page=="things-to-do"){
            if(jQuery(window).scrollTop()>=100){
                this.headerNav.classList.remove("bg-transparent");
                this.headerNav.classList.add("bg-white");
                this.headerNavMobile.classList.remove("bg-transparent");
                this.headerNavMobile.classList.add("bg-white");
                jQuery('.navbar-nav li a.nav-link,.navbar-nav li a.link-underline,.navbar-nav li button').removeClass("text-white");
                jQuery('.navbar-nav li a.nav-link,.navbar-nav li a.link-underline,.navbar-nav li button').addClass("text-dark");
                jQuery('.navbar-nav li a.btn').removeClass("btn-outline-light");
                jQuery('.navbar-nav li a.btn').addClass("btn-outline-dark");

            }else{
                this.headerNav.classList.remove("bg-white");
                this.headerNav.classList.add("bg-transparent");
                this.headerNavMobile.classList.remove("bg-white");
                this.headerNavMobile.classList.add("bg-transparent");
                jQuery('.navbar-nav li a.nav-link,.navbar-nav li a.link-underline,.navbar-nav li button').removeClass("text-dark");
                jQuery('.navbar-nav li a.nav-link,.navbar-nav li a.link-underline,.navbar-nav li button').addClass("text-white");
                jQuery('.navbar-nav li a.btn').removeClass("btn-outline-dark");
                jQuery('.navbar-nav li a.btn').addClass("btn-outline-light");
            }
        }else{
            jQuery('.navbar-nav li a.nav-link,.navbar-nav li a.link-underline,.navbar-nav li button').removeClass("text-white");
            jQuery('.navbar-nav li a.nav-link,.navbar-nav li a.link-underline,.navbar-nav li button').addClass("text-dark");
            jQuery('.navbar-nav li a.btn').removeClass("btn-outline-light");
            jQuery('.navbar-nav li a.btn').addClass("btn-outline-dark"); 
        }

        if(ootlahData.page=="home" && jQuery(window).width()>=960){
            if(jQuery(window).scrollTop()>=100){
                jQuery('#secondary-header').show();
                jQuery('#location-header-menu').children().appendTo('#location-secondary-header-menu');
                jQuery('#home-search-hero').children().appendTo('#search-header');
            }else{
                jQuery('#secondary-header').hide();
                jQuery('#location-secondary-header-menu').children().appendTo('#location-header-menu');
                jQuery('#search-header').children().appendTo('#home-search-hero');
            }
        }
        
    }

    updateCurrency(e){
        var thisData = jQuery(e.target);
        
        var formData = {
            "action":"setCurrency",
            "currency":thisData.val()
        };
        jQuery.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce',ootlahData.nonce);
            },
            dataType: "json",
            url: ootlahData.root_url + '/wp-admin/admin-ajax.php',
            type: 'POST',
            data: formData,
            success: (response) => {
                location.reload();
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response);
            }
        });
    }
}

//export default Header
const header = new Header()
//import Header from "./modules/Header"

jQuery('#user-dash-menu').hover(function(){
	jQuery('#user-menu').stop().fadeIn(200);
},function(){
	jQuery('#user-menu').stop().fadeOut(200);
});

jQuery('.currency-btn').hover(function(){
	jQuery('#currency-selection-menu').stop().fadeIn(200);
},function(){
	jQuery('#currency-selection-menu').stop().fadeOut(200);
});

jQuery('#change-location-btn').hover(function(){
	jQuery('#location-selection-menu').stop().fadeIn(200);
},function(){
	jQuery('#location-selection-menu').stop().fadeOut(200);
});

jQuery('#top-activities-secondary-header-menu').hover(function(){
	jQuery('#top-activities-selection-menu').stop().fadeIn(200);
},function(){
	jQuery('#top-activities-selection-menu').stop().fadeOut(200);
});