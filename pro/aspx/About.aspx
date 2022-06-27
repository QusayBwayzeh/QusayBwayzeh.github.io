﻿<%@ Page Title="" Language="C#" MasterPageFile="~/ProWebSite.master" AutoEventWireup="true" CodeFile="About.aspx.cs" Inherits="About" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <form runat="server">
    <div id="body-content">


			<!-- =============================
			///// Begin about me section /////
			============================== -->
			<section id="about-me-section" class="about-me-simple">
				<div class="about-me-inner"> <!-- add/remove class "tt-wrap" to enable/disable element boxed layout (class "tt-boxed" is required in <body> tag! ) -->
						
					<!-- ======================
					///// Begin split box /////
					based on: http://www.minimit.com/articles/solutions-tutorials/bootstrap-3-responsive-columns-of-same-height
					======================= -->
					<div class="split-box about-me">
						<div class="container-fluid">
							<div class="row">
								<div class="row-lg-height">

									<!-- Column -->
									<div class="col-lg-6 col-lg-height split-box-image no-padding bg-image" style="background-image: url(img/AboutPic.jpg); background-position: 50% 50%;">

										<!-- Split box image height
										============================
										* You can use prepared "padding-height-*" helper classes to set split box image height. Example: "padding-height-85" (useful if "split-box-content" contend/text is very short). Also you can use class "full-height-vh" for full height image. Find out "helper.css" file for more info. Note: class "sbi-height" is required.
										-->
										<div class="sbi-height full-height-vh"></div>

									</div> <!-- /.col -->

									<!-- Column -->
									<div class="col-lg-6 col-lg-height col-lg-middle no-padding">

										<!-- Begin split box content 
										============================= 
										* Use class "shifted-left" or "shifted-right" to enable shifted content (do not use for long content).
										-->
										<div class="split-box-content sb-content-right shifted-left">

											<!-- Begin tt-heading 
											====================== 
											* Use class "padding-on" to enable heading paddings (useful if you use tt-heading as stand alone element).
											* Use class "text-center" or "text-right" to align tt-heading.
											* Use classes "tt-heading-xs", "tt-heading-sm", "tt-heading-lg", "tt-heading-xlg" or "tt-heading-xxlg" to set tt-heading size.
											-->
											<div class="tt-heading">
												<div class="tt-heading-inner">
													<h1 class="tt-heading-title"><asp:Label ID="AboutName" runat="server" Text="Label"></asp:Label></h1>
													<div class="tt-heading-subtitle"><asp:Label ID="AboutPosition" runat="server" Text="Label"></asp:Label></div>
													<hr class="hr-short">
												</div> <!-- /.tt-heading-inner -->
											</div>
											<!-- End tt-heading -->

											<div class="margin-top-30">
												<p><asp:Label ID="AboutText" runat="server" Text="Label"></asp:Label></p>
											</div>

											<a href="Contact.aspx" class="btn btn-primary margin-top-20">Contact Me !</a>
											<!-- Begin signature -->
											<div class="signature">
												<img class="signature-dark" src="img/signature.png" alt="">
												<img class="signature-light" src="img/signature.png" alt="">
											</div>
											<!-- End signature -->

										</div>
										<!-- End split box content -->

									</div> <!-- /.col -->

								</div> <!-- /.row-height -->
							</div> <!-- /.row -->
						</div> <!-- /.container -->
					</div>
					<!-- End split box -->

				</div> <!-- /.about-me-inner -->
			</section>
			<!-- End about me section -->
        </div>

        </form>
 </asp:Content>

