$(document).ready(function(){ 
	$('#container1').mCustomScrollbar({ 
            theme:"dark-3"        
    });
	$(function () {
		$(".kpmg-one-selectbox").selectbox();
	});
	/*$(".kpmg-one-tab-link-approvals").click(function(){
       	$('.kpmg-one-tab-content-approvals').show();
		$('.kpmg-one-tab-content-appadmins').hide();
	   	$('.kpmg-one-tab-content-onboard').hide();
	   	$('.kpmg-one-tab-content-notifications').hide();
		$('.kpmg-one-tab-content-analytics').hide();
		$('.kpmg-one-tab-content-adhoc').hide(); 
		$(this).addClass('active'); 
		$('.kpmg-one-tab-link-appadmins').removeClass('active');
		$('.kpmg-one-tab-link-onboard').removeClass('active');
		$('.kpmg-one-tab-link-notifications').removeClass('active');
		$('.kpmg-one-tab-link-analytics').removeClass('active');
		$('.kpmg-one-tab-link-adhoc').removeClass('active');	
    });
	$(".kpmg-one-tab-link-appadmins").click(function(){
       	$('.kpmg-one-tab-content-approvals').hide();
		$('.kpmg-one-tab-content-appadmins').show();
	   	$('.kpmg-one-tab-content-onboard').hide();
	   	$('.kpmg-one-tab-content-notifications').hide();
		$('.kpmg-one-tab-content-analytics').hide();
		$('.kpmg-one-tab-content-adhoc').hide();
		$('.kpmg-one-tab-link-approvals').removeClass('active');
		$(this).addClass('active'); 
		$('.kpmg-one-tab-link-onboard').removeClass('active');
		$('.kpmg-one-tab-link-notifications').removeClass('active');
		$('.kpmg-one-tab-link-analytics').removeClass('active');
		$('.kpmg-one-tab-link-adhoc').removeClass('active');	
    });
	$(".kpmg-one-tab-link-onboard").click(function(){
       	$('.kpmg-one-tab-content-approvals').hide();
		$('.kpmg-one-tab-content-appadmins').hide();
	   	$('.kpmg-one-tab-content-onboard').show();
	   	$('.kpmg-one-tab-content-notifications').hide();
		$('.kpmg-one-tab-content-analytics').hide();
		$('.kpmg-one-tab-content-adhoc').hide();
		$('.kpmg-one-tab-link-approvals').removeClass('active');
		$('.kpmg-one-tab-link-appadmins').removeClass('active');
		$(this).addClass('active'); 
		$('.kpmg-one-tab-link-notifications').removeClass('active');
		$('.kpmg-one-tab-link-analytics').removeClass('active');	
		$('.kpmg-one-tab-link-adhoc').removeClass('active');		
    });
	$(".kpmg-one-tab-link-notifications").click(function(){
       	$('.kpmg-one-tab-content-approvals').hide();
		$('.kpmg-one-tab-content-appadmins').hide();
	   	$('.kpmg-one-tab-content-onboard').hide();
	   	$('.kpmg-one-tab-content-notifications').show();
		$('.kpmg-one-tab-content-analytics').hide();
		$('.kpmg-one-tab-content-adhoc').hide();
		$('.kpmg-one-tab-link-approvals').removeClass('active');
		$('.kpmg-one-tab-link-appadmins').removeClass('active');
		$('.kpmg-one-tab-link-onboard').removeClass('active');
		$(this).addClass('active'); 
		$('.kpmg-one-tab-link-analytics').removeClass('active');	
		$('.kpmg-one-tab-link-adhoc').removeClass('active');		
    });
	$(".kpmg-one-tab-link-analytics").click(function(){
       	$('.kpmg-one-tab-content-approvals').hide();
		$('.kpmg-one-tab-content-appadmins').hide();
	   	$('.kpmg-one-tab-content-onboard').hide();
	   	$('.kpmg-one-tab-content-notifications').hide();
		$('.kpmg-one-tab-content-analytics').show();
		$('.kpmg-one-tab-content-adhoc').hide();
		$('.kpmg-one-tab-link-approvals').removeClass('active');
		$('.kpmg-one-tab-link-appadmins').removeClass('active');
		$('.kpmg-one-tab-link-onboard').removeClass('active');
		$('.kpmg-one-tab-link-notifications').removeClass('active');
		$(this).addClass('active'); 		
		$('.kpmg-one-tab-link-adhoc').removeClass('active');		
    });
	$(".kpmg-one-tab-link-adhoc").click(function(){
       	$('.kpmg-one-tab-content-approvals').hide();
		$('.kpmg-one-tab-content-appadmins').hide();
	   	$('.kpmg-one-tab-content-onboard').hide();
	   	$('.kpmg-one-tab-content-notifications').hide();
		$('.kpmg-one-tab-content-analytics').hide();
		$('.kpmg-one-tab-content-adhoc').show();
		$('.kpmg-one-tab-link-approvals').removeClass('active');
		$('.kpmg-one-tab-link-appadmins').removeClass('active');
		$('.kpmg-one-tab-link-onboard').removeClass('active');
		$('.kpmg-one-tab-link-notifications').removeClass('active');
		$('.kpmg-one-tab-link-analytics').removeClass('active');	
		$(this).addClass('active');		
    });*/
	$(".kpmg-one-past-note").click(function(){
       	$('.kpmg-one-past-note-tab').show();
	   	$('.kpmg-one-up-note-tab').hide();
		$(this).addClass('active'); 
		$('.kpmg-one-up-note').removeClass('active');
    });
	$(".kpmg-one-up-note").click(function(){
       	$('.kpmg-one-past-note-tab').hide();
	   	$('.kpmg-one-up-note-tab').show();
		$(this).addClass('active'); 
		$('.kpmg-one-past-note').removeClass('active');
    });
	$(".kpmg-one-notifications").click(function(){
		$('.kpmg-one-notification-panel').toggleClass('active'); 
    });
	$(".kpmg-one-alert a").click(function(){
	   	$('.kpmg-one-alert').hide();
    });
	$(".kpmg-one-popup-wrapper a.kpmg-one-popup-close").click(function(){
	   	$('.kpmg-one-popup-wrapper').hide();
    });
    
	$(".kpmg-one-approvals-accordian-tab li a.kpmg-one-approvals-accordian-tab-pending-appr").click(function(){
		alert('ggg');
		$(this).addClass('active');
		$('.kpmg-one-approvals-accordian-tab-approved-apps').removeClass('active');
		$('.kpmg-one-approvals-accordian-tab-rejected-apps').removeClass('active');
	   	$('.kpmg-one-approvals-accordian-tab-content').show();
		$('.kpmg-one-approvals-accordian-tab-content-approved-aaps').hide();
		$('.kpmg-one-approvals-accordian-tab-content-rejected-aaps').hide();
    });
	$(".kpmg-one-approvals-accordian-tab li a.kpmg-one-approvals-accordian-tab-approved-apps").click(function(){ 		alert('ggg');
		$(this).addClass('active');
		$('.kpmg-one-approvals-accordian-tab-pending-appr').removeClass('active');
		$('.kpmg-one-approvals-accordian-tab-rejected-apps').removeClass('active');
	   	$('.kpmg-one-approvals-accordian-tab-content').hide();
		$('.kpmg-one-approvals-accordian-tab-content-approved-aaps').show();
		$('.kpmg-one-approvals-accordian-tab-content-rejected-aaps').hide();
    });
	$(".kpmg-one-approvals-accordian-tab li a.kpmg-one-approvals-accordian-tab-rejected-apps").click(function(){ 		alert('ggg');
		$(this).addClass('active');
		$('.kpmg-one-approvals-accordian-tab-pending-appr').removeClass('active');
		$('.kpmg-one-approvals-accordian-tab-approved-apps').removeClass('active');
	   	$('.kpmg-one-approvals-accordian-tab-content').hide();
		$('.kpmg-one-approvals-accordian-tab-content-approved-aaps').hide();
		$('.kpmg-one-approvals-accordian-tab-content-rejected-aaps').show();
    });
});