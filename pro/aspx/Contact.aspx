﻿<%@ Page Title="" Language="C#" MasterPageFile="~/ProWebSite.master" AutoEventWireup="true" CodeFile="Contact.aspx.cs" Inherits="Contact" %>

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
			<section id="page-header" class="ph-sm">

				<!-- Begin page header image 
				============================= 
				* Use class "parallax-bg-1" up to "parallax-bg-6" to enable background image parallax effect.
				* Use class "fade-out-scroll-3" to enable fade out effect if page scroll.
				* Use class "hide-ph-image" to hide page header image without removing the code.
				-->
				<div class="page-header-image parallax-bg-3 bg-image" style="background-image: url(img/contactHeader.jpg);">
					
					<!-- Element cover 
					===================
					* You can use prepared background transparent classes depends on brightness of your page header image. More info: file "helper.css".
					-->
					<div class="cover bg-transparent-5-dark"></div>
					
				</div>
				<!-- End page header image -->

				<!-- Begin page header inner -->
				<div class="page-header-inner tt-wrap">

					<!-- Begin page header caption 
					===============================
					* Use classes "ph-caption-xs", "ph-caption-sm", "ph-caption-lg" or "ph-caption-xlg" to set page header size.
					* Use class "parallax-1" up to "parallax-6" to enable parallax effect.
					* Use class "fade-out-scroll-1" up to "fade-out-scroll-6" to enable fade out effect if page scroll.
					-->
					<div class="page-header-caption ph-caption-lg parallax-4 fade-out-scroll-3">
						<h1 class="page-header-title"><asp:Label ID="HeaderName" runat="server" Text=""></asp:Label></h1>
						<hr class="hr-short">
												
						<!-- Use data attributes to set text maximum characters or words (example: data-max-characters="120" or data-max-words="40") -->
						<div class="page-header-description" data-max-words="40">
							<p><asp:Label ID="HeaderText" runat="server" Text=""></asp:Label></p>
						</div>

					</div>
					<!-- End page header caption -->

				</div> 
				<!-- End page header inner -->

			</section>
			<!-- End page header -->


			<!-- ============================
			///// Begin contact section /////
			============================= -->
			<section id="contact-section">
				<div class="contact-section-inner tt-wrap"> <!-- add/remove class "tt-wrap" to enable/disable element boxed layout (class "tt-boxed" is required in <body> tag! ) -->
					
					<!-- ======================
					///// Begin split box /////
					based on: http://www.minimit.com/articles/solutions-tutorials/bootstrap-3-responsive-columns-of-same-height
					======================= -->
					<div class="split-box">
						<div class="container-fluid">
							<div class="row">
								<div class="row-lg-height full-height-vh">

									<!-- Column -->
									<div class="col-lg-6 col-lg-height col-lg-middle bg-image" style="background-image: url(img/contact.jpg); background-position: 50% 50%;">

										<!-- Element cover -->
										<div class="cover"></div>

										<!-- Begin split box content -->
										<div class="split-box-content text-left no-padding-left no-padding-right">

											<!-- Begin contact info -->
											<div class="contact-info-wrap">
												<div class="contact-info">
													<p><i class="fas fa-home"></i> Address: <asp:Label ID="Address" runat="server" Text=""></asp:Label></p>
													<p><i class="fas fa-phone"></i> Phone: <asp:Label ID="Phone" runat="server" Text=""></asp:Label></p>
													<p><i class="fas fa-envelope"></i> Email: <asp:Literal ID="LiteralEmail" runat="server"></asp:Literal><asp:Label ID="Email" runat="server" Text=""></asp:Label></p>
												</div>

												<!-- Begin social buttons -->
												<div class="social-buttons margin-top-20">
													<ul>
                                        <li><a href="https://www.instagram.com/motaz_btoush/" class="btn btn-social-min btn-default btn-rounded-full" title="Follow me on Instagram" target="_blank"><i class="fab fa-instagram"></i></a></li>
										<li><a href="#" class="btn btn-social-min btn-default btn-rounded-full" title="Follow me on Twitter"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#" class="btn btn-social-min btn-default btn-rounded-full" title="Follow me on LinkedIn"><i class="fab fa-linkedin-in"></i></a></li>
													</ul>
												</div>
												<!-- End social buttons -->

											</div>
											<!-- End contact info -->

										</div>
										<!-- End split box content -->

									</div> <!-- /.col -->

									<!-- Column -->
									<div class="col-lg-6 col-lg-height col-lg-middle no-padding">

										<!-- Begin split box content -->
										<div class="split-box-content">

											<!-- Begin contact form 
											========================= -->
											<form id="contact-form">
												<div class="contact-form-inner text-left">

													<div class="contact-form-info">

														<!-- Begin tt-heading 
														====================== 
														* Use class "padding-on" to enable heading paddings (useful if you use tt-heading as stand alone element).
														* Use class "text-center" or "text-right" to align tt-heading.
														* Use classes "tt-heading-xs", "tt-heading-sm", "tt-heading-lg", "tt-heading-xlg" or "tt-heading-xxlg" to set tt-heading size.
														-->
														<div class="tt-heading">
															<div class="tt-heading-inner">
																<h1 class="tt-heading-title"><asp:Label ID="BodyName" runat="server" Text="Label"></asp:Label></h1>
																<!-- <div class="tt-heading-subtitle">Subtitle Here</div> -->
																<hr class="hr-short">
															</div> <!-- /.tt-heading-inner -->
														</div>
														<!-- End tt-heading -->

														<div class="margin-top-30">
															<p><asp:Label ID="BodyText" runat="server" Text="Label"></asp:Label></p>
														</div>

													</div> <!-- /.contact-form-info -->

													<!-- Begin hidden required fields (https://github.com/agragregra/uniMail) -->
													<input type="hidden" name="project_name" value="yourwebsiteaddress.com"> <!-- Change value to your site name -->
													<input type="hidden" name="admin_email" value="your@email.com"> <!-- Change value to your valid email address (where a message will be sent) -->
													<input type="hidden" name="form_subject" value="Message from yourwebsiteaddress.com"> <!-- Change value to your own message subject -->
													<!-- End Hidden Required Fields -->

													<div class="row">
														<div class="col-lg-6">
															<div class="form-group">
																<input type="text" class="form-control" name="name" placeholder="Your Name" required="">
															</div>
														</div>
														<div class="col-lg-6">
															<div class="form-group">
																<input type="email" class="form-control" name="email" placeholder="Your Email" required="">
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12">
															<div class="form-group">
																<input type="text" class="form-control" name="subject" placeholder="Subject" required="">
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12">
															<div class="form-group">
																<select class="form-control" name="option" required="">
																	<option value="" disabled="" selected="">Select an option</option>
																	<option value="Say Hello">Say hello</option>
																	<option value="New Project">New project</option>
																	<option value="Feedback">Feedback</option>
																	<option value="Other">Other</option>
																</select>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12">
															<div class="form-group">
																<textarea class="form-control" name="message" rows="4" placeholder="Your Message" required=""></textarea>
															</div>
														</div>
													</div>

													<div class="small text-gray"><em>* All fields are required!</em></div>

												</div> <!-- /.contact-form-inner -->

												<div class="row">
													<div class="col-lg-12">
														<button type="submit" class="btn btn-primary btn-lg margin-top-40">Send Message</button>
													</div>
												</div>
											</form>
											<!-- End contact form -->

										</div>
										<!-- End split box content -->

									</div> <!-- /.col -->
								</div> <!-- /.row-height -->
							</div> <!-- /.row -->

<%--							<div class="row">
								<div class="col-lg-12 no-padding">

									<!-- Begin custom Google Map 
									=============================
									* Tutorial: https://developers.google.com/maps/documentation/javascript/tutorial
									* Styles: https://snazzymaps.com/
									-->
									<div id="map"></div>
									<!-- End custom Google Map -->

								</div> <!-- /.col -->
							</div> <!-- /.row -->--%>
							
						</div> <!-- /.container -->
					</div>
					<!-- End split box -->

				</div> <!-- /.contact-section-inner -->
			</section>
			<!-- End contact section -->
</div>
            </form>
</asp:Content>

