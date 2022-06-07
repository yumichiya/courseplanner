

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

/**
 * Servlet implementation class Add
 */
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String title = request.getParameter("title");
		String date = request.getParameter("date");
		
		PrintWriter out = response.getWriter();
        JSONObject item = new JSONObject();
		
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

			if(title != "null" && date != "null") {
				addItem(title, date);
			}if else () {

			}
			
			
	 
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	void addItem(String title, String date) {
		String sql = "INSERT INTO item(title, date) VALUES('" + title + "\', '" + date + "\');";
		System.out.println(sql);
		stmt.executeUpdate(sql);
	}

	void addProperty(String propertyName, String optionName){
		String sql = "INSERT INTO " + propertyName + "(option) VALUES('" + optionName + "\');";
		System.out.println(sql);
		stmt.executeUpdate(sql);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
