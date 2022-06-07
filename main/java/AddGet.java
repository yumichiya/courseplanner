

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
 * Servlet implementation class AddGet
 */
public class AddGet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddGet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
        
		JSONObject obj = new JSONObject();
		JSONArray arr = new JSONArray();
        JSONObject item;
		
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
			
			String sql = "SELECT * FROM item;";

			System.out.println(sql);
			ResultSet rs = (ResultSet) stmt.executeQuery(sql);
			
	        String t, d;
	        while(rs.next()){
	        	t = rs.getString("title");
				d = rs.getString("date");
				item = new JSONObject();
				item.put("title", t);
				item.put("date", d);
				arr.add(item);
	        }
	        obj.put("item", arr);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		System.out.println(obj.toString());
		out.write(obj.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
