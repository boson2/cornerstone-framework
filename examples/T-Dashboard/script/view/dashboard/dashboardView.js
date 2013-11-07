define(
	[
		'jquery', 
		'backbone',
		//'view/dashboard/twitterWidget', 
		'view/dashboard/youtubeWidget', 
		'view/dashboard/vocSatisfactionWidget', 
		'view/dashboard/vocWidget', 
		'view/dashboard/facebookLikeWidget', 
		'view/dashboard/blogWidget', 
		'view/dashboard/pricePlanWidget', 
		'template!../template/dashboard/dashboard',
		'isotope', 
		'widget-chart',
		'widget-scrollview',
		'style!../style/dashboard/dashboardStyle'
	], function(
		$, 
		Backbone, 
		//TwitterWidget,
		YoutubeWidget, 
		VocSatisfactionWidget, 
		VocWidget, 
		FacebookLikeWidget, 
		BlogWidget, 
		PricePlanWidget, 
		template
	){
	var DashboardView = Backbone.View.extend({
		el : 'div#contentsView',
		
		initialize: function() {
		},
		
		/*
		 * 대쉬 보드에서 발생하는 이벤트 정의
		 */
		events: {
			'click div#dashboard_lte': 'lteClick',
			'click div[data-widgettitle="dashboard_voc"]': 'vocClick',
			'click div#dashboard_policy': 'pricePlanClick',
			'click div#dashboard_sns': 'snsClick',
			'click div#dashboard_facebook': 'facebookClick',
			'click div#dashboard_youtube': 'youtubeClick'
		},
		
		/*
		 * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
		 */
		lteClick: function(e) {
			document.location = '#lteReport';
		},
		vocClick: function(e) {
			if(typeof($(e.target).attr('data-voclist')) == 'undefined' && typeof($(e.target).parent().attr('data-voclist')) == 'undefined') {
				document.location = '#voc';	
			} else {
				document.location = '#voc/' + ($(e.target).attr('data-voclist') || $(e.target).parent().attr('data-voclist'));
			}
		},
		pricePlanClick: function(e) {
			if(typeof($(e.target).attr('data-id')) == 'undefined') {
				document.location = '#pricePlan';	
			} else {
				document.location = '#pricePlan/' + $(e.target).attr('data-id');
			}
		},
		snsClick: function(e) {
			document.location = '#sns';
		},
		facebookClick: function(e) {
			document.location = '#facebook';
		},
		youtubeClick: function(e) {
			document.location = '#youtube';
		},
		
		render: function() {
			$(this.el).html(template());
			
			//isotope 처리
			$(function() {
				var $container = $('#dashboard_container');

                // 안드로이드에서 성능문제로 isotope 비활성화
//				if(!navigator.userAgent.match("Android")) {
                    $container.isotope({
                        itemSelector : '.dashboardItem'
                    });
//                }
			});

			$('.dashboardItem').spinner('show');
		},
		
		/*
		 * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
		 */
		viewDidAppear: function() {
			//가벼운 순서대로 위젯 그려주는걸 추천
			
			//VOC 만족률 위젯 그리기
			var vocSatisfactionWidget = new VocSatisfactionWidget();
			vocSatisfactionWidget.render();
			
			//VOC 위젯 그리기
			var vocWidget = new VocWidget();
			vocWidget.render();
			
			//유투부 그리기
			var youtubeWidget = new YoutubeWidget();
			youtubeWidget.render();
			
			//정책 그리기
			var pricePlanWidget = new PricePlanWidget();
			pricePlanWidget.render();
			
			//facebook like widget
			var facebookLikeWidget = new FacebookLikeWidget();
			facebookLikeWidget.render();
			
			//LTE 계통현황 차트 그려주기
			$.getJSON("data/bar.json").success(function(json) {
				$("#reportChart").featuredChart({
                    resize:false,
                    duration: 0,
					chartType : "stackedBar",
					data : json,
                    autoResize: false // 화면회전시 성능 문제로 자동 리사이징 비활성화
				});
			});
			$('#reportChart').parent().spinner('hide');
			
			//트위터 그리기
			// var twitterWidget = new TwitterWidget();
			// twitterWidget.render();
			
			//blog 그리기
			var blogWidget = new BlogWidget();
			blogWidget.render();
		},
		
		/*
		 * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
		 */
		viewDidDisappear: function() {
		},
		
	});
	
	return new DashboardView;
});
