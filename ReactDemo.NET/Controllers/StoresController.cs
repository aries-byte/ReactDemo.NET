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
    public class StoresController : Controller
    {
        private ReactEntities db = new ReactEntities();

        // GET: Stores
        public ActionResult Index()
        {
            return View(db.Stores.ToList());
        }
        // GET: Stores/GetStoresData
        public JsonResult GetStoresData()
        {

            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Stores.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


        }       

        // GET: Stores/Create
        public JsonResult Create(string storeName, string storeAddress)
        {
            Store store = new Store();
            store.Name = storeName;
            store.Address = storeAddress;
            Create(store);
            var jsondata = new
            {
                Name = store.Name.ToString(),
                Price = store.Address.ToString()
            };
            return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // POST: Stores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Address")] Store store)
        {
            if (ModelState.IsValid)
            {
                db.Stores.Add(store);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(store);
        }

        // GET: Stores/Edit/5
        public JsonResult Edit(int? id, string storeName, string storeAddress)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                store.Id = store.Id;
                store.Name = storeName;
                store.Address = storeAddress;
                Edit(store);
                var jsondata = new
                {
                    Id = store.Id.ToString(),
                    Name = store.Name.ToString(),
                    Address = store.Address.ToString()
                };
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // POST: Stores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] Store store)
        {
            if (ModelState.IsValid)
            {
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(store);
        }

        // GET: Stores/Delete/5           
        public JsonResult Delete(int? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
            }
            db.Configuration.ProxyCreationEnabled = false;
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return Json(HttpNotFound());
            }
            else
            {
                var jsondata = new
                {
                    Id = store.Id.ToString(),
                    Name = store.Name.ToString(),
                    Address = store.Address.ToString()
                };
                db.Stores.Remove(store);
                db.SaveChanges();
                return new JsonResult { Data = jsondata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

        }

        // POST: Stores/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Store store = db.Stores.Find(id);
            db.Stores.Remove(store);
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
