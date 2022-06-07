import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.ResultSet;
import com.mysql.jdbc.Statement;

public class UserLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public UserLogin() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("username");
		String password = request.getParameter("password");
		
		PrintWriter out = response.getWriter();
        JSONObject user = new JSONObject();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
		
		String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		String DB_URL = "jdbc:mysql://localhost:3306/courseplanner";
		String USER = "root";
		String PASS = "";
		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = (Connection) DriverManager.getConnection(DB_URL,USER,PASS);
			stmt = (Statement) conn.createStatement();

			String sql = "SELECT name, password FROM user WHERE name = \'" + name + "\' AND password = \'" + password + "\';";
			
			ResultSet rs = (ResultSet) stmt.executeQuery(sql);
	        String sqlName, sqlPass;
	        while(rs.next()){
				sqlName = rs.getString("name");
				sqlPass = rs.getString("password");
				if(name.equals(sqlName) && password.equals(sqlPass)) {
					user.put("username", sqlName);
					user.put("password", sqlPass);
					out.write(user.toString());
					out.close();
				}else {
					out.println("error");
				}
	        }
	        rs.close();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
