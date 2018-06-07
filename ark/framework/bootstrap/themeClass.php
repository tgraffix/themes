<?php

class ffTheme extends ffThemeAbstract {

	const HEADER_POST_TYPE_SLUG = 'ff-header';
	const TEMPLATE_POST_TYPE_SLUG = 'ff-template';
	const CONTENT_BLOCK_ADMIN_POST_TYPE_SLUG = 'ff-content-block-a';
	const PORTFOLIO_POST_TYPE_SLUG = 'ff-portfolio';
	const FOOTER_POST_TYPE_SLUG = 'ff-footer';

	protected function _setDependencies() {

	}

	protected function _registerAssets() {
		$fwc = $this->_getContainer()->getFrameworkContainer();
		$fwc->getAdminScreenManager()->addAdminScreenClassName('ffAdminScreenThemeDashboard');
//		$fwc->getAdminScreenManager()->addAdminScreenClassName('ffAdminScreenGeneralOptions');
		$fwc->getAdminScreenManager()->addAdminScreenClassName('ffAdminScreenThemeOptions');
		$fwc->getAdminScreenManager()->addAdminScreenClassName('ffAdminScreenSidebarManager');

//		$this->_registerCustomPostType('Header', 'Headers', ffTheme::HEADER_POST_TYPE_SLUG );
		$this->_registerCustomPostType('Template', 'Templates', ffTheme::TEMPLATE_POST_TYPE_SLUG );

		if( FF_DEVELOPER_MODE || ffContainer()->getRequest()->get('page') == 'Dummy') {
			$this->_registerCustomPostType('Content Block Adm', 'Content Blocks Adm', ffTheme::CONTENT_BLOCK_ADMIN_POST_TYPE_SLUG );
		}

		$this->_registerCustomColumnHooks();

//		$this->_registerCustomPostType('Footer', 'Footers', ffTheme::FOOTER_POST_TYPE_SLUG );

		$metaBoxManager = $fwc->getMetaBoxes()->getMetaBoxManager();

		$themeContainer = ffThemeContainer::getInstance();
		foreach( $themeContainer->getWritepanelsCollection() as $name => $dir ){
			$metaBoxManager->addMetaBoxClassName( $name );
		}

		foreach( $themeContainer->getWidgetsCollection() as $name => $dir ){
			$fwc->getWidgetManager()->addWidgetClassName( 'ffWidget'.$name );
		}
	}

	protected function _registerCustomColumnHooks() {
		$WPLayer = $this->_getContainer()->getFrameworkContainer()->getWPLayer();

		$WPLayer->add_filter('manage_ff-template_posts_columns', array($this, 'actTemplateColumnsPosts'));
		$WPLayer->add_filter('manage_ff-template_posts_custom_column', array($this, 'actTemplateColumns'), 10, 2);
	}

	public function actTemplateColumns( $columnName, $postId) {
//		var_dump( $postId );
//		global $post;
//		var_dump( $post->ID);
//		die();
		if( $columnName == 'shortcode' ) {
			echo '<input type="text" style="background-color:#f9f9f9" value="[ff_template id=\''.$postId.'\']">';
		}
	}

	public function actTemplateColumnsPosts( $defaults ) {
//		var_dump( $defaults );
//		die();
//		$defaults['shortcode'] = 'Shortcode';

		$firstPart = array_slice( $defaults,0,2);
		$secondPart = array_slice( $defaults, 2);

		$final = array_merge( $firstPart, array('shortcode'=>'Shortcode'), $secondPart );

		return $final;
	}

	private function _registerCustomPostType( $name_singular, $name_plural, $slug ) {

		$postTypeManager = $this->_getContainer()->getFrameworkContainer()->getPostTypeRegistratorManager();
//		$registrator = $postTypeManager->addHiddenPostTypeRegistrator( $slug , $name_singular);
		$registrator = $postTypeManager->addPostTypeRegistrator( $slug , $name_singular);

		if( $name_singular == 'Content Block Adm' && !FF_DEVELOPER_MODE ) {
			$registrator->getArgs()->set('show_in_menu', false );
		} else {
			$registrator->getArgs()->set('show_in_menu', 'ThemeDashboard');
		}


		if('Headers' == $name_plural){
			$registrator->getSupports()->set('revisions', false)->set('editor',false);
		}else{
			$registrator->getSupports()->set('revisions', true)->set('editor',true);
		}
		$registrator->getLabels()->set('all_items', $name_plural);

		if( 'Content Block A' == $name_singular ) {
			$registrator->getSupports()->set('thumbnail', true);
		}

		$registrator->getLabels()->set('all_items', $name_plural);



	}

	protected function _run() {
	}

	protected function _ajax() {

	}
}