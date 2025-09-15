class Activities {
    constructor() {
        this.events();
        this.isRangeBoxOpen = false;
    }

    events() {
        jQuery('.filter-chk-ul li').on("change",'.cat-filter', this.filterList.bind(this));
        jQuery('.filter-chk-ul li').on("change",'.food-type-chk-filter', this.filterListByFoodType.bind(this));
        jQuery('.filter-chk-ul li').on("change",'.day-period-chk-filter', this.filterListByFoodPeriod.bind(this));
        jQuery('.filter-chk-ul li').on("change",'.culinary-traditions-chk-filter', this.filterListByFoodCulture.bind(this));
        jQuery('.filter-chk-ul li').on("change",'.culinary-services-chk-filter', this.filterListByFoodServices.bind(this));
        jQuery('.filter-chk-ul li').on("change",'.destinations-chk-filter', this.filterListByLocation.bind(this));
        jQuery('.filter-chk-ul li').on("click",'.toggle-filter-chk', this.toggleList.bind(this));
        jQuery('.activity-list-sidebar-inner-section').on("click",'.see-more', this.showMoreList.bind(this));
        jQuery('.activity-list-sidebar-inner-section').on("click",'.see-less', this.showLessList.bind(this));
        jQuery('.activity-list-sidebar-inner-section').on("click",'.clear-selection', this.clearFilter.bind(this));
        jQuery('#pagination-section').on("click",'.page-link', this.paginate.bind(this));
        jQuery('#filter-price').on("click", this.showRangeBox.bind(this));
        jQuery('#sort-select').on("change", this.sortFilter.bind(this));
        jQuery('#confirm-filter-price').on("click", this.filterByPrice.bind(this));
        jQuery('#show-filter-list-modal').on("click", this.showFilterModal.bind(this));
        jQuery('#show-sort-list-modal').on("click", this.showSortModal.bind(this));
        jQuery('#close-mobile-modal-filter').on("click", this.hideFilterModal.bind(this));
        jQuery('#close-mobile-modal-sort').on("click", this.hideSortModal.bind(this));
        jQuery('#cancel-mobile-modal-filter').on("click", this.hideFilterModal.bind(this));
        jQuery('#cancel-mobile-modal-sort').on("click", this.hideSortModal.bind(this));
        jQuery('#price-range-box').on("click", this.stopOpenPropagation.bind(this));
        jQuery('.seo-list-box').on("click",'.jq-read', this.readExpand.bind(this));
        jQuery('.seo-list-box').on("click",'.jq-read-less', this.readMinimize.bind(this));
        jQuery('#mobile-modal-sorter').on("click",'input[name="mobile-sort"]', this.mobileSort.bind(this));
        jQuery('#apply-mobile-filter').on("click", this.applyFilter.bind(this));
        jQuery('#apply-mobile-sort').on("click", this.applySort.bind(this));
        jQuery(document).on("click", this.keyPressDispatcher.bind(this));

    }

    showSortModal(e){
        jQuery("body").css("overflow", "hidden");
        jQuery("#mobile-sort-modal").show();
        jQuery("#mobile-sort-modal").animate({ bottom: "0%" }, 300);
    }

    hideSortModal(e){
        jQuery("#mobile-sort-modal").animate({ bottom: "-100%" }, 300);
        jQuery("body").css("overflow", "auto");
        setTimeout(function(){
            jQuery("#mobile-sort-modal").hide();
        },300);
    }

    showFilterModal(e){
        jQuery('#price-range-filter').children().appendTo('#price-filter-mobile-sidebar-section');
        jQuery("#mobile-modal-filter").show();
        jQuery("#mobile-modal-filter").animate({ bottom: "0%" }, 300);
    }

    hideFilterModal(e){
        jQuery("#mobile-modal-filter").animate({ bottom: "-100%" }, 300);
        setTimeout(function(){
            jQuery("#mobile-modal-filter").hide();
        },300);
    }

    mobileSort(e){
        var sortVal = jQuery(e.target).val();
        var thisParent = jQuery(e.target).parents(".sort-mobile");
        jQuery(".sort-mobile").removeClass('active');
        thisParent.addClass('active');
        jQuery('#sort-select').val(sortVal).change();
    }

    applySort(e){
        //var setSortVal = jQuery('input[name="mobile-sort"]').map(function(){return this.value;}).get();
        //console.log(setSortVal);
        
        jQuery(".mobile-modal-loader").show();
        setTimeout(function(){
            jQuery("#mobile-sort-modal").animate({ bottom: "-100%" }, 300);
            jQuery(".mobile-modal-loader").hide();
        },600);
        
        setTimeout(function(){
            jQuery("#mobile-sort-modal").hide();
            
        },900);
    }

    applyFilter(e){
        jQuery(".mobile-modal-loader").show();
        setTimeout(function(){
            jQuery("#mobile-modal-filter").animate({ bottom: "-100%" }, 300);
            jQuery(".mobile-modal-loader").hide();
        },600);
        
        setTimeout(function(){
            jQuery("#mobile-modal-filter").hide();
            
        },900);
    }

    paginate(e){
        var thisBtn = jQuery(e.target);
        var thisParent = jQuery(e.target).parents("#pagination-section");
        var thisPagination = thisParent.find('.pagination');
        
        var counter = thisBtn.data("counter");
        var thisPageItem = thisPagination.find('.counter-'+counter);

        var url = new URL(ootlahData.link);
        if(counter==1 || counter==0){
            url.searchParams.delete('start');
        }else{
            url.searchParams.append('start', counter);
        }
        
        
        // HISTORY.PUSHSTATE
        history.pushState('', 'New URL: '+url, url);
        e.preventDefault();
        jQuery('.page-item').removeClass('active');
        thisPageItem.addClass('active');

        
        //console.log(thisPageItem);
        jQuery('#page-start').val(counter);
        this.filter();
        
    }

    clearFilter(e){
        var thisClear = jQuery(e.target);
        var thisClearParent = jQuery(e.target).parents(".activity-list-sidebar-inner-section");
        thisClearParent.find('input[type="checkbox"]').prop("checked",false);
        thisClearParent.find('.chk-lbl').removeClass('active');
        
        this.filter();
        thisClear.hide();
    }

    readExpand(e){
        var thisBtn = jQuery(e.target);
        var thisBtnParent = jQuery(e.target).parents(".col-12");
        jQuery(thisBtnParent).find('.seo-list-info').removeClass('hidden-p');
        thisBtn.hide();
        jQuery(thisBtnParent).find('.jq-read-less').show();
    }

    readMinimize(e){
        var thisBtn = jQuery(e.target);
        var thisBtnParent = jQuery(e.target).parents(".col-12");
        jQuery(thisBtnParent).find('.seo-list-info').addClass('hidden-p');
        thisBtn.hide();
        jQuery(thisBtnParent).find('.jq-read').show();
    }

    showMoreList(e){
        var thisBtn = jQuery(e.target);
        var thisBtnParent = jQuery(e.target).parents(".activity-list-sidebar-inner-section");
        jQuery(thisBtnParent).find('ul.filter-chk-ul').css("height","auto");
        thisBtn.removeClass('see-more');
        thisBtn.addClass('see-less').text("See less");
    }

    showLessList(e){
        var thisBtn = jQuery(e.target);
        var thisBtnParent = jQuery(e.target).parents(".activity-list-sidebar-inner-section");
        jQuery(thisBtnParent).find('ul.filter-chk-ul').css("height","180px");
        thisBtn.removeClass('see-less');
        thisBtn.addClass('see-more').text("See more");
    }

    sortFilter(e){
        this.filter(); 
    }

    filterListByFoodType(e){
        var thisChk = jQuery(e.target);
        var thisSpanParent = jQuery(e.target).parents(".parent-food-type-chk-lbl");
        var thisVal = thisChk.val();

        if(thisChk.is(':checked')){
            jQuery(thisSpanParent).addClass('active');
            thisChk.prop("checked",true);
        }else{
            jQuery(thisSpanParent).removeClass('active');
            thisChk.prop("checked",false);
        }

        
        if(jQuery('.food-type-chk-filter:checked').map(function(){return this.value;}).get().length>=1){
            jQuery('#food-type-clear-selection').show();
        }else{
            jQuery('#food-type-clear-selection').hide(); 
        }

      
        jQuery('#page-start').val(0);
        var url = new URL(ootlahData.link);
        url.searchParams.delete('start');

        history.pushState('', 'New URL: '+url, url);
        e.preventDefault();
 
        this.filter();
    }

    filterListByFoodPeriod(e){
        var thisChk = jQuery(e.target);
        var thisSpanParent = jQuery(e.target).parents(".parent-food-period-chk-lbl");
        var thisVal = thisChk.val();

        if(thisChk.is(':checked')){
            jQuery(thisSpanParent).addClass('active');
            thisChk.prop("checked",true);
        }else{
            jQuery(thisSpanParent).removeClass('active');
            thisChk.prop("checked",false);
        }

        
        if(jQuery('.day-period-chk-filter:checked').map(function(){return this.value;}).get().length>=1){
            jQuery('#food-period-clear-selection').show();
        }else{
            jQuery('#food-period-clear-selection').hide(); 
        }

      
        jQuery('#page-start').val(0);
        var url = new URL(ootlahData.link);
        url.searchParams.delete('start');

        history.pushState('', 'New URL: '+url, url);
        e.preventDefault();
 
        this.filter();
    }

    filterListByFoodCulture(e){
        var thisChk = jQuery(e.target);
        var thisSpanParent = jQuery(e.target).parents(".parent-food-traditions-chk-lbl");
        var thisVal = thisChk.val();

        if(thisChk.is(':checked')){
            jQuery(thisSpanParent).addClass('active');
            thisChk.prop("checked",true);
        }else{
            jQuery(thisSpanParent).removeClass('active');
            thisChk.prop("checked",false);
        }

        
        if(jQuery('.culinary-traditions-chk-filter:checked').map(function(){return this.value;}).get().length>=1){
            jQuery('#culinary-traditions-clear-selection').show();
        }else{
            jQuery('#culinary-traditions-clear-selection').hide(); 
        }

      
        jQuery('#page-start').val(0);
        var url = new URL(ootlahData.link);
        url.searchParams.delete('start');

        history.pushState('', 'New URL: '+url, url);
        e.preventDefault();
 
        this.filter();
    }

    filterListByFoodServices(e){
        var thisChk = jQuery(e.target);
        var thisSpanParent = jQuery(e.target).parents(".parent-food-services-chk-lbl");
        var thisVal = thisChk.val();

        if(thisChk.is(':checked')){
            jQuery(thisSpanParent).addClass('active');
            thisChk.prop("checked",true);
        }else{
            jQuery(thisSpanParent).removeClass('active');
            thisChk.prop("checked",false);
        }

        
        if(jQuery('.culinary-services-chk-filter:checked').map(function(){return this.value;}).get().length>=1){
            jQuery('#culinary-services-clear-selection').show();
        }else{
            jQuery('#culinary-services-clear-selection').hide(); 
        }

      
        jQuery('#page-start').val(0);
        var url = new URL(ootlahData.link);
        url.searchParams.delete('start');

        history.pushState('', 'New URL: '+url, url);
        e.preventDefault();
 
        this.filter();
    }

    filterListByLocation(e){
        var thisChk = jQuery(e.target);
        var thisSpanParent = jQuery(e.target).parents(".parent-chk-lbl");
        var thisVal = thisChk.val();

        if(thisChk.is(':checked')){
            jQuery(thisSpanParent).addClass('active');
            thisChk.prop("checked",true);
        }else{
            jQuery(thisSpanParent).removeClass('active');
            thisChk.prop("checked",false);
        }

        
        if(jQuery('.destinations-chk-filter:checked').map(function(){return this.value;}).get().length>=1){
            jQuery('#destination-clear-selection').show();
        }else{
            jQuery('#destination-clear-selection').hide(); 
        }

      
        jQuery('#page-start').val(0);
        var url = new URL(ootlahData.link);
        url.searchParams.delete('start');

        history.pushState('', 'New URL: '+url, url);
        e.preventDefault();
 
        this.filter();
    }

    filterList(e){
        var thisChk = jQuery(e.target);
        var thisSpanParent = jQuery(e.target).parents(".parent-chk-lbl");
        var thisVal = thisChk.val();

        if(thisChk.is(':checked')){
            jQuery(thisSpanParent).addClass('active');

        }else{
            jQuery(thisSpanParent).removeClass('active');
        }

        if(thisChk.data("type")=="parent"){
            if(thisChk.is(':checked')){
                //jQuery(thisSpanParent).addClass('active');
                jQuery('.sub-category-filter-'+thisVal).prop("checked",true);
                jQuery('.sub-category-chk-lbl-'+thisVal).addClass('active');
            }else{
                //jQuery(thisSpanParent).removeClass('active');
                jQuery('.sub-category-filter-'+thisVal).prop("checked",false);
                jQuery('.sub-category-chk-lbl-'+thisVal).removeClass('active');
            }
            
        }


        if(jQuery('.cat-filter:checked').map(function(){return this.value;}).get().length>=1){
            jQuery('#categories-clear-selection').show();
        }else{
            jQuery('#categories-clear-selection').hide(); 
        }
        jQuery('#page-start').val(0);
        var url = new URL(ootlahData.link);
        url.searchParams.delete('start');

        history.pushState('', 'New URL: '+url, url);
        e.preventDefault();
 
        this.filter();
    }

    toggleList(e){
        var thisToggle = jQuery(e.target);
        var thisListParent = jQuery(e.target).parents("li");
     
        
        if(jQuery(thisListParent).find('ul').is(":visible")){
            //jQuery(thisListParent).find('ul').hide();
            jQuery(thisListParent).find('ul').slideToggle(300);
            thisListParent.find('.svg-angle-down').css("transform","rotate(0deg)");
            //thisListParent.find('.svg-angle-down').css("border","1px solid #f00");
        }else{
            //jQuery(thisListParent).find('ul').show();
            jQuery(thisListParent).find('ul').slideToggle(300);
            thisListParent.find('.svg-angle-down').css("transform","rotate(180deg)");
            //thisListParent.find('.svg-angle-down').css("border","1px solid #000");
        }

        
    }

    filterByPrice(e){
        jQuery('#price-range-box').hide();
        var maxPrice = jQuery('.noUi-handle-upper').attr('aria-valuenow');
        var minPrice = jQuery('.noUi-handle-lower').attr('aria-valuenow');
        jQuery('#price-range-filter-text').text(minPrice+' - '+maxPrice+' AED');
        jQuery('#page-start').val(0);
        this.filter();
    }

    filter(){
        jQuery('#booking-loader').show();
        var formData = {
            "action":"filter_result",
            "link":jQuery('#page-link').val(),
            "id":ootlahData.id,
            "language":ootlahData.language,
            "sub_type":ootlahData.sub_type,
            "destinations_chk": jQuery('.destinations-chk-filter:checked').map(function(){return this.value;}).get(),
            "categories_chk": jQuery('.category-filter:checked').map(function(){return this.value;}).get(),
            "meal_type_chk": jQuery('.food-type-chk-filter:checked').map(function(){return this.value;}).get(),
            "day_period_chk": jQuery('.day-period-chk-filter:checked').map(function(){return this.value;}).get(),
            "culinary_traditions_chk": jQuery('.culinary-traditions-chk-filter:checked').map(function(){return this.value;}).get(),
            "culinary_services_chk": jQuery('.culinary-services-chk-filter:checked').map(function(){return this.value;}).get(),
            "sub_categories_chk": jQuery('.sub-category-filter:checked').map(function(){return this.value;}).get(),
            "sort_by":jQuery('#sort-select').val(),
            "max_p":jQuery('.noUi-handle-upper').attr('aria-valuenow'),
            "min_p":jQuery('.noUi-handle-lower').attr('aria-valuenow'),
            "start":jQuery('#page-start').val(),
            "keyword":jQuery('#keyword').val()
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
                if(response.result=="success"){
                    jQuery('#booking-loader').hide();
                    jQuery('#result-text').text(response.result_count);
                    jQuery('#list-row').html(response.html);
                    jQuery('#pagination-section').html(response.pagination);
                    jQuery('#page-count-title').text(response.page_count_title);
                    jQuery('html,body').animate({scrollTop:jQuery("#activity-list-section").offset().top-100}, 500);
                }
            },
            error: (response) => {
                setTimeout(function(){
                    jQuery('#booking-loader').hide();
                },1000);
            }
        });
    }
    showRangeBox(e){
        
        jQuery('#price-range-box').show();
        this.isCouponBoxOpen = true;
    }
    keyPressDispatcher(e) {
        if (!jQuery(e.target).closest('#price-range-box').length && !jQuery(e.target).is('#filter-price')) {
            jQuery('#price-range-box').hide();
            this.isRangeBoxOpen = false;
        }
    }

    stopOpenPropagation(e){
        e.stopPropagation();
    }
}

const activities = new Activities();