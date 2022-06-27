<%@ Page Title="" Language="C#" MasterPageFile="~/ProWebSite.master" AutoEventWireup="true" CodeFile="Gallery.aspx.cs" Inherits="Gallery" MaintainScrollPositionOnPostback="true"%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
            <form runat="server">
    <div id="body-content">


			<!-- ========================
			///// Begin page header /////
			=============================
			* Use classes "ph-xs", "ph-sm", "ph-lg" or "ph-xlg" to set page header size.
			* Use class "ph-center" or "ph-right" to align page header caption.
			-->
			<section id="page-header" class="ph-lg">

				<!-- Begin page header image 
				============================= 
				* Use class "parallax-bg-1" up to "parallax-bg-6" to enable background image parallax effect.
				* Use class "fade-out-scroll-3" to enable fade out effect if page scroll.
				* Use class "hide-ph-image" to hide page header image without removing the code.
				-->
				<div class="page-header-image parallax-bg-3 bg-image" style="background-image: url(img/gallery-header.jpg);">

					<!-- Element cover 
					===================
					* You can use prepared background transparent classes depends on brightness of your page header image. More info: file "helper.css".
					-->
					<div class="cover bg-transparent-5-dark Custom"></div>

				</div>
				<!-- End page header image -->

				<!-- Begin page header inner -->
				<div class="page-header-inner tt-wrap">
<section id="more-projects-section">

				<!-- Begin tt-heading 
				====================== 
				* Use class "padding-on" to enable heading paddings (useful if you use tt-heading as stand alone element).
				* Use class "text-center" or "text-right" to align tt-heading.
				* Use classes "tt-heading-xs", "tt-heading-sm", "tt-heading-lg", "tt-heading-xlg" or "tt-heading-xxlg" to set tt-heading size.
				-->
				<div class="tt-heading padding-on text-center bg-white-3">
 						<h1 class="tt-heading-title">Albums</h1>
 				</div>
				<!-- End tt-heading -->

				<div class="more-projects-inner"> <!-- add/remove class "tt-wrap" to enable/disable element boxed layout (class "tt-boxed" is required in <body> tag! ) -->

					<!-- Begin project carousel 
					============================ -->
					<div class="project-carousel">

						<!-- Begin content carousel (https://owlcarousel2.github.io/OwlCarousel2/)
						====================================================================
						* Use class "nav-outside" for outside nav (requires boxed layout).
						* Use class "nav-outside-top" for outside top nav (requires enough space at the top of the carousel).
						* Use class "nav-bottom-right" for bottom right nav.
						* Use class "nav-rounded" for rounded nav.
						* Use class "nav-light" to enable nav light style.
						* Use class "dots-outside" for outside dots (requires enough space at the bottom of the carousel).
						* Use class "dots-left", "dots-right" or "dots-center-right" to align dots.
						* Use class "dots-rounded" for rounded dots.
						* Use class "owl-mousewheel" to enable mousewheel support.
						* Use class "cursor-grab" to enable cursor grab icon (no effect on links!).
						* Use class "cc-hover-light", "cc-hover-dark" or "cc-hover-zoom" to enable carousel items hover effect.
						* Use class "cc-height-1", "cc-height-2", "cc-height-3", "cc-height-4", "cc-height-5", "cc-height-6" or "cc-height-full" to set carousel height (do not use with data-autoheight="true"!!!).
						* Use class "cc-height-m" to set full height for small screens (do not use with data-autoheight="true"!!!).
						================================================================
						* Available carousel data attributes:
								data-items="5".......................(items visible on desktop)
								data-tablet-landscape="4"............(items visible on mobiles)
								data-tablet-portrait="3".............(items visible on mobiles)
								data-mobile-landscape="2"............(items visible on tablets)
								data-mobile-portrait="1".............(items visible on tablets)
								data-loop="true".....................(true/false)
								data-margin="10".....................(space between items)
								data-center="true"...................(true/false)
								data-start-position="0"..............(item start position)
								data-animate-in="fadeIn".............(more animations: http://daneden.github.io/animate.css/)
								data-animate-out="fadeOut"...........(more animations: http://daneden.github.io/animate.css/)
								data-mouse-drag="false"..............(true/false)
								data-touch-drag="false"..............(true/false)
								data-autoheight="true"...............(true/false)
								data-autoplay="true".................(true/false)
								data-autoplay-timeout="5000".........(milliseconds)
								data-autoplay-hover-pause="true".....(true/false)
								data-autoplay-speed="800"............(milliseconds)
								data-drag-end-speed="800"............(milliseconds)
								data-nav="true"......................(true/false)
								data-nav-speed="800".................(milliseconds)
								data-dots="false"....................(true/false)
								data-dots-speed="800"................(milliseconds)
						-->
						<div class="owl-carousel cc-height-1 cc-hover-dark nav-outside-top" data-items="4" data-margin="0" data-dots="false" data-nav="true" data-nav-speed="800" data-mobile-portrait="1" data-tablet-landscape="3" data-tablet-portrait="2" data-mobile-landscape="1" data-mobile-portrait="1">

 
        <asp:Literal ID="Albums" runat="server"></asp:Literal>
						</div>
						<!-- End content carousel -->

					</div>
					<!-- End project carousel -->

				</div> <!-- /.more-projects-inner -->
			</section>
				</div>
				<!-- End page header inner -->

				<!-- Begin gallery single nav Disabled--> 
				<%--<div class="gallery-single-nav parallax-2 fade-out-scroll-4">
					<a href="" class="gsn-prew" title="Prew Project"><i class="fas fa-angle-left"></i></a>
					<a href="albums-grid-fluid.html" class="gsn-back" title="Back to albums"><i class="fas fa-th"></i></a>
					<a href="" class="gsn-next" title="Next Project"><i class="fas fa-angle-right"></i></a>
				</div>--%>
				<!-- End gallery single nav -->

			</section>
			<!-- End page header -->


			<!-- ===================================
			///// Begin gallery single section /////
			==================================== -->
			<section id="gallery-single-section">
				<div class="isotope-wrap"> <!-- add/remove class "tt-wrap" to enable/disable element boxed layout (class "tt-boxed" is required in <body> tag! ) -->
					
					<!-- Begin isotope
					===================
					* Use class "gutter-1", "gutter-2" or "gutter-3" to add more space between items.
					* Use class "col-1", "col-2", "col-3", "col-4", "col-5" or "col-6" for columns.
					-->
					<div class="isotope col-4 gutter-3">

						<!-- Begin isotope top content -->
						<div class="isotope-top-content">

							<!-- Begin gallery share button 
							================================
							* Use class "gs-right" to align gallery share button.
							-->
							<a href="#0" class="gallery-share gs-right" data-toggle="modal" data-target="#modal-64253091" title="Share this gallery"><i class="fas fa-share-alt"></i></a>
							<!-- End gallery share button -->

							<!-- Begin modal 
							=================
							* Use class "modal-center" to enable modal center position (use for short content only!).
							* Use class "modal-left" to enable left sidebar modal.
							* Use class "modal-right" to enable right sidebar modal.
							-->
							<div id="modal-64253091" class="modal modal-center fade" tabindex="-1" role="dialog" aria-hidden="false">
							   <div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="tt-close-btn"></i></button>
											<h4 class="modal-title">Share This Gallery:</h4>
										</div> <!-- /.modal-header -->

										<div class="modal-body">

											<!-- Begin modal body image 
											============================
											* Use class "modal-body-image-1" or "modal-body-image-2" to set modal body image style.
											-->
											<div class="modal-body-image-1 bg-image" style="background-image: url(img/page-share-box.jpg); background-position: 50% 50%;"></div>
											<!-- End modal body image -->

											<!-- Begin modal body content -->
											<div class="modal-body-content">

												<!-- Begin modal share -->
												<div class="modal-share">

													<!-- Begin social buttons -->
													<div class="social-buttons">
														<ul>
															<li><a href="#0" class="btn btn-social-min btn-facebook btn-rounded-full" title="Share on facebook"><i class="fab fa-facebook-f"></i></a></li>
															<li><a href="#0" class="btn btn-social-min btn-twitter btn-rounded-full" title="Share on twitter"><i class="fab fa-twitter"></i></a></li>
															<li><a href="#0" class="btn btn-social-min btn-google btn-rounded-full" title="Share on google+"><i class="fab fa-google-plus-g"></i></a></li>
															<li><a href="#0" class="btn btn-social-min btn-pinterest btn-rounded-full" title="Share on pinterest"><i class="fab fa-pinterest-p"></i></a></li>
														</ul>
													</div>
													<!-- End social buttons -->

													<!-- modal share grab link -->
													<input class="grab-link" type="text" readonly="" value="https://yoursite.com/your-gallery-link/" onclick="this.select()">

												</div>
												<!-- End modal share -->

											</div>
											<!-- End modal body content -->

										</div> <!-- /.modal-body -->

										<div class="modal-footer">
											Qusay Albwayzeh 2020 - All Rights Reserved &copy;
										</div> <!-- /.modal-footer -->

									</div> <!-- /.modal-content -->
								</div> <!-- /.modal-dialog -->
							</div>
							<!-- End modal -->

						</div>
						<!-- End isotope top content -->

						<!-- Begin isotope items wrap 
						==============================
						* Use classes "gsi-color", "gsi-zoom" or "gsi-simple" to change gallery single item cover variations.
						-->
						<div id="gallery" class="isotope-items-wrap lightgallery gsi-color">

							<!-- Grid sizer (do not remove!!!) -->
							<div class="grid-sizer"></div>

                            <asp:Literal ID="LitPic" runat="server"></asp:Literal>
							<!-- End isotope item -->

						</div>
						<!-- End isotope items wrap -->


						<!-- Begin isotope pagination 
						============================== -->
						<%--<div class="isotope-pagination"> Disabled
							<div class="iso-load-more">
								<a class="btn btn-dark-bordered btn-lg" href="">View More <i class="fas fa-refresh"></i></a>
							</div>
						</div>--%>
						<!-- End isotope pagination -->

					</div>
					<!-- End isotope -->

				</div> <!-- /.isotope-wrap -->
			</section>
			<!-- End gallery single section -->


			<!-- ==================================
			///// Begin more projects cection /////
			=================================== -->
			
			<!-- End more projects cection -->

</div>
                </form>
</asp:Content>

