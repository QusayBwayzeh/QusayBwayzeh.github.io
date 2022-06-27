using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Gallery : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Mokarrams"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (con.State == ConnectionState.Closed) { con.Open(); }

            SqlCommand Get = new SqlCommand("select * from Albums", con);
            SqlDataReader rdr = Get.ExecuteReader();
            while (rdr.Read())
            {
                this.Albums.Text += @"<a href='?"+rdr["ID"].ToString()+"' class='cc-item'>	<div class='cc-image full-cover bg-image' style='background-image: url(img/Albums/"+rdr["ID"].ToString()+".jpg);'></div>    <div class='cc-caption center max-width-400'>		<h2 class='cc-title'>"+rdr["Caption"].ToString()+"</h2>		<div class='cc-category'><span>"+rdr["Tag"].ToString()+"</span></div>	</div></a>";
            }
            rdr.Close();


            string getAlbum = Request.QueryString.ToString();
            SqlCommand GetImgs = new SqlCommand("select * from Photos where Album = '"+ getAlbum +"'", con);
            SqlDataReader rdr2 = GetImgs.ExecuteReader();
            while (rdr2.Read())
            {
                if (rdr2["VideoURL"].ToString() == "")
                {
                    this.LitPic.Text += @"<div class='isotope-item'><a href='img\Photos\" + rdr2["ID"].ToString() + ".jpg' class='gallery-single-item lg-trigger' data-exthumbnail='img/Photos/" + rdr2["ID"].ToString() + ".jpg' data-sub-html='<p>" + rdr2["Caption"].ToString() + "</p>'><img src='img/Photos/" + rdr2["ID"].ToString() + ".jpg' class='gs-item-image' alt=''><div class='gsi-image-caption'>" + rdr2["Caption"].ToString() + "</div><div class='gs-item-icon'><i class='fas fa-search'></i></div></a></div>";
                }
                else
                {
                    this.LitPic.Text += @"<div class='isotope-item'><a href='"+rdr2["VideoURL"].ToString()+"' class='gallery-single-item lg-trigger' data-sub-html='<p>" + rdr2["Caption"].ToString() + "</p>'><img src='img/Photos/" + rdr2["ID"].ToString() + ".jpg' class='gs-item-image' alt=''><div class='gsi-image-caption'>" + rdr2["Caption"].ToString() + "</div><div class='gs-item-icon'><i class='fas fa-play'></i></div></a></div>";
                }
            }
            rdr2.Close();


            if (con.State == ConnectionState.Open) { con.Close(); }
        }
    }
}