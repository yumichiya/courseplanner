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

public class UserRegistration extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public UserRegistration() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		JSONObject obj = new JSONObject();
		JSONArray arr = new JSONArray();
        JSONObject user;
		
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

		String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		String DB_URL = "jdbc:mysql://localhost:3306/users";
		String USER = "root";
		String PASS = "";
		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = (Connection) DriverManager.getConnection(DB_URL,USER,PASS);
			stmt = (Statement) conn.createStatement();
			String sql = "SELECT * FROM user;";
			System.out.println(sql);

			ResultSet rs = (ResultSet) stmt.executeQuery(sql);
			
			String u, p;
			while(rs.next()){
				u = rs.getString("username");
				p = rs.getString("password");
				user = new JSONObject();
				user.put("username", u);
				user.put("password", p);
				arr.add(user);
			}
			obj.put("user", arr);
			rs.close();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		out.write(obj.toString());
		out.close();
		
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");

		String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		String DB_URL = "jdbc:mysql://localhost:3306/users";
		String USER = "root";
		String PASS = "";
		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = (Connection) DriverManager.getConnection(DB_URL,USER,PASS);
			stmt = (Statement) conn.createStatement();
			String sql = "INSERT INTO user (username, password) " +
						 "VALUES (\'" + username + "\', \'" + password + "\');";
			System.out.println(sql);
			stmt.executeUpdate(sql);
			
			sql = "CREATE DATABASE " + username + ";";
			System.out.println(sql);
			stmt.executeUpdate(sql);
			
			sql = "USE " + username + ";";
			System.out.println(sql);
			stmt.executeUpdate(sql);
			
			sql = "CREATE TABLE item(title VARCHAR(20), date DATE, time TIME, "
					+ "end_date DATE, end_time TIME, complete BOOLEAN);";
			System.out.println(sql);
			stmt.executeUpdate(sql);
			
			sql = "CREATE TABLE property(name VARCHAR(10);";
			System.out.println(sql);
			stmt.executeUpdate(sql);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
	}

}
