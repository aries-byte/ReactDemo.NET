using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using ReactDemo.NET.Models;


namespace ReactDemo.NET.Controllers
{
    public class ProductsController : Controller
    {
        private ReactEntities db = new ReactEntities();

        // GET: Product
        public ActionResult Index()
        {
            return View(db.Products.ToList());
        }
        // GET: Product/GetProductData
        public JsonResult GetProductData()
        {

            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Products.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }

        // GET: Product/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // GET: Product/Create
        public JsonResult Create(string pName, decimal pPrice)
        {
            Product product = new Product();
            product.Name = pName;
            product.Price = pPrice;
            Create(product);
            var jsondata = new
            {
                Name = product.Name.ToString(),
                Price = product.Price.ToString()
            };
            return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // POST: Product/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Price")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(product);
        }

        // GET: Product/Edit/5
        public JsonResult Edit(int? id, string pName, decimal pPrice)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                product.Id = product.Id;
                product.Name = pName;
                product.Price = pPrice;
                Edit(product);
                var jsondata = new
                {
                    Id = product.Id.ToString(),
                    Name = product.Name.ToString(),
                    Price = product.Price.ToString()
                };
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // POST: Product/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Price")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        // GET: Product/Delete/5        
        public JsonResult Delete(int? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                var jsondata = new
                {
                    Id = product.Id.ToString(),
                    Name = product.Name.ToString(),
                    Price = product.Price.ToString()
                };
                db.Products.Remove(product);
                db.SaveChanges();
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

        }




        // POST: Product/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return Json(true);
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
