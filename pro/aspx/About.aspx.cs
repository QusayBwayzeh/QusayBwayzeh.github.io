using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
public partial class About : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Mokarrams"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {
        if (con.State == ConnectionState.Closed) { con.Open(); }

        SqlCommand GetAbout = new SqlCommand("select * from About", con);
         SqlDataReader rdr = GetAbout.ExecuteReader();
        while (rdr.Read())
        {
            AboutName.Text = rdr["AboutName"].ToString();
            AboutPosition.Text = rdr["AboutPosition"].ToString();
            AboutText.Text = rdr["AboutText"].ToString();
        }
        rdr.Close();

        if (con.State == ConnectionState.Open) { con.Close(); }

    }
}