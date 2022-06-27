using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Contact : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Mokarrams"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (con.State == ConnectionState.Closed) { con.Open(); }

            SqlCommand Get = new SqlCommand("select * from Contact", con);
            SqlDataReader rdr = Get.ExecuteReader();
            while (rdr.Read())
            {
                HeaderName.Text = rdr["HeaderName"].ToString();
                HeaderText.Text = rdr["HeaderText"].ToString();
                BodyName.Text = rdr["BodyName"].ToString();
                BodyText.Text = rdr["BodyText"].ToString();
                Address.Text = rdr["Address"].ToString();
                Phone.Text = rdr["Phone"].ToString();
                Email.Text = rdr["Email"].ToString();
                LiteralEmail.Text = "<a href='mailto:" + rdr["Email"].ToString() +"' target='_blank'>";
            }
            rdr.Close();

            if (con.State == ConnectionState.Open) { con.Close(); }
        }
    }
}
