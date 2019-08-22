using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ReactDemo.NET.Models;

namespace ReactDemo.NET.Controllers
{
    public class CustomersController : Controller
    {
        private ReactEntities db = new ReactEntities();

        // GET: Customers
        public ActionResult Index()
        {
            return View(db.Customers.ToList());
        }
        // GET: Customers/GetCustomersData
        public JsonResult GetCustomersData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Customers.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        // GET: Customers/Create
        public JsonResult Create(string custName, string custAddress)
        {
            Customer cust = new Customer();
            cust.Name = custName;
            cust.Address = custAddress;
            Create(cust);
            var jsondata = new
            {
                Name = cust.Name.ToString(),
                Address = cust.Address.ToString()
            };
            return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Address")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(customer);
        }

        // GET: Customers/Edit/5
        public JsonResult Edit(int? id, string custName, string custAddress)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                customer.Id = customer.Id;
                customer.Name = custName;
                customer.Address = custAddress;
                Edit(customer);
                var jsondata = new
                {
                    Id = customer.Id.ToString(),
                    Name = customer.Name.ToString(),
                    Address = customer.Address.ToString()
                };
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(customer);
        }

        // GET: Customers/Delete/5
        public JsonResult Delete(int? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                var jsondata = new
                {
                    Id = customer.Id.ToString(),
                    Name = customer.Name.ToString(),
                    Address = customer.Address.ToString()
                };
                db.Customers.Remove(customer);
                db.SaveChanges();
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            
        }

        // POST: Customers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Customer customer = db.Customers.Find(id);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
