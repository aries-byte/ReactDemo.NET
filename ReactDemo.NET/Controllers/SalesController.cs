using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using ReactDemo.NET.Models;

namespace ReactDemo.NET.Controllers
{
    public class SalesController : Controller
    {
        private ReactEntities db = new ReactEntities();

        public ActionResult Index()
        {
            var salesData = db.Sales.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store);
            return View(salesData.ToList());
        }
        // GET: Sales/GetSalesData
        public JsonResult GetSalesData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var salesData = (from s in db.Sales
                              join c in db.Customers on s.CustomerId equals c.Id
                              join p in db.Products on s.ProductId equals p.Id
                              join st in db.Stores on s.StoreId equals st.Id                             
                              select new
                              {
                                  Id = s.Id,
                                  custId = c.Id,
                                  custName = c.Name,
                                  prodId = p.Id,
                                  prodName = p.Name,
                                  storeId = st.Id,
                                  storeName = st.Name,
                                  saleDate  = s.DateSold
                              }).ToList();
            return new JsonResult { Data = salesData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // GET: Sales/GetProdData
        public JsonResult GetProdData()
        {
            db.Configuration.ProxyCreationEnabled = false;            
            var prodData = (from p in db.Products
                             select new
                             {
                                 key = p.Id,
                                 text = p.Name,
                                 value = p.Id
                             }).ToList();
            return new JsonResult { Data = prodData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        // GET: Sales/GetProdData
        public JsonResult GetStoreData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var storeData = (from s in db.Stores
                            select new
                            {
                                key = s.Id,
                                text = s.Name,
                                value = s.Id
                            }).ToList();
            return new JsonResult { Data = storeData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        // GET: Sales/GetProdData
        public JsonResult GetCustData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var custData = (from c in db.Customers
                            select new
                            {
                                key = c.Id,
                                text = c.Name,
                                value = c.Id
                            }).ToList();
            return new JsonResult { Data = custData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        // GET: Sales/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sale sale = db.Sales.Find(id);
            if (sale == null)
            {
                return HttpNotFound();
            }
            return View(sale);
        }

        // GET: Sales/Create
        public JsonResult Create(int prodId, int storeId, int custId, DateTime saleDate)
        {
            Sale s = new Sale();           
            s.CustomerId = custId;
            s.StoreId = storeId;
            s.ProductId = prodId;
            s.DateSold = saleDate;
            Create(s);
            var jsondata = new
            {
                CustomerId = s.CustomerId.ToString(),
                StoreId = s.StoreId.ToString(),
                ProdId = s.ProductId.ToString(),
                DateSold = s.DateSold.ToString()
            };
            return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // POST: Sales/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,ProductId,CustomerId,StoreId,DateSold")] Sale sale)
        {
            if (ModelState.IsValid)
            {
                db.Sales.Add(sale);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CustomerId = new SelectList(db.Customers, "Id", "Name", sale.CustomerId);
            ViewBag.ProductId = new SelectList(db.Products, "Id", "Name", sale.ProductId);
            ViewBag.StoreId = new SelectList(db.Stores, "Id", "Name", sale.StoreId);
            return View(sale);
        }

        // GET: Sales/Edit/5
        public JsonResult Edit(int? id, int prodId, int storeId, int custId, DateTime saleDate)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Sale sale = db.Sales.Find(id);
            if (sale == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                sale.ProductId = prodId;
                sale.StoreId = storeId;
                sale.CustomerId = custId;
                sale.DateSold = saleDate;
                Edit(sale);
                var jsondata = new
                {
                    Id = sale.Id.ToString(),
                    ProductId = sale.ProductId.ToString(),
                    CustomerId = sale.CustomerId.ToString(),
                    StoreId = sale.StoreId.ToString(),
                    DateSold = sale.DateSold.ToString(),
                };
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // POST: Sales/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,ProductId,CustomerId,StoreId,DateSold")] Sale sale)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sale).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CustomerId = new SelectList(db.Customers, "Id", "Name", sale.CustomerId);
            ViewBag.ProductId = new SelectList(db.Products, "Id", "Name", sale.ProductId);
            ViewBag.StoreId = new SelectList(db.Stores, "Id", "Name", sale.StoreId);
            return View(sale);
        }

        // GET: Sales/Delete/5
        public JsonResult Delete(int? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Sale sale = db.Sales.Find(id);
            if (sale == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                var jsondata = new
                {
                    Id = sale.Id.ToString(),
                    ProductId = sale.ProductId.ToString(),
                    StoreId = sale.StoreId.ToString(),
                    CustId = sale.CustomerId.ToString(),
                    DateSold = sale.DateSold.ToString()
                };
                db.Sales.Remove(sale);
                db.SaveChanges();
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // POST: Sales/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Sale sale = db.Sales.Find(id);
            db.Sales.Remove(sale);
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
