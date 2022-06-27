using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Mokarrams"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (con.State == ConnectionState.Closed) { con.Open(); }
            SqlCommand Get = new SqlCommand("select * from Home", con);
            SqlDataReader rdr = Get.ExecuteReader();
            while (rdr.Read())
            {
                BigAbout.Text = rdr["BigAbout"].ToString();
                MedAbout.Text = rdr["MedAbout"].ToString();
                SmallAbout.Text = rdr["SmallAbout"].ToString();
                BigGallery.Text = rdr["BigGallery"].ToString();
                MedGallery.Text = rdr["MedGallery"].ToString();
                SmallGallery.Text = rdr["SmallGallery"].ToString();
                BigContact.Text = rdr["BigContact"].ToString();
                MedContact.Text = rdr["MedContact"].ToString();
                SmallContact.Text = rdr["SmallContact"].ToString();
            }
            rdr.Close();

            if (con.State == ConnectionState.Open) { con.Close(); }
        }
        }
    }