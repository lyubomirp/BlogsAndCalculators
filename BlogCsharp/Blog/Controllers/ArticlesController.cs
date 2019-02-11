using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Blog.Data;
using Blog.Models;
using Microsoft.AspNetCore.Authorization;

namespace Blog.Controllers
{
    public class ArticlesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ArticlesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Articles
        public ActionResult Index()
        {
            return RedirectToAction("List", "Articles");
        }

        public ActionResult List()
        {
            var articles = _context.Articles
                .Include(a => a.Author)
                .ToList();

            return View(articles);
        }

        // GET: Articles/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return StatusCode(500);
            }

            var articles =  _context.Articles
                .Include(a => a.Author)
                .First(m => m.Id == id);

            if (articles == null)
            {
                return StatusCode(500);
            }

            return View(articles);
        }

        // GET: Articles/Create
        [Authorize]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Articles/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize]
        public ActionResult Create(Articles articles)
        {
            if (ModelState.IsValid)
            {
                var authorId = _context.Users
                    .Where(u => u.UserName == this.User.Identity.Name)
                    .First()
                    .Id;

                articles.AuthorId = authorId;

                _context.Articles.Add(articles);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(articles);
        }

        // GET: Articles/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            try
            {
                var articles = _context.Articles
                .Include(a => a.Author)
                .First(m => m.Id == id);

                if (articles == null)
                {
                    return NotFound();
                }

                if(IsUserAuthorizedToEdit(articles) == false)
                {
                    return Forbid();
                }

                var model = new ArticleViewModel();
                model.Id = articles.Id;
                model.Title = articles.Title;
                model.Content = articles.Content;


                return View(model);
            } catch (NullReferenceException)
            {
                return Forbid();
            }
        }

        // POST: Articles/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Edit(ArticleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var articles = _context.Articles
                    .Where(x => x.Id == model.Id)
                    .First();

                if (articles == null)
                {
                    return NotFound();
                }


                articles.Title = model.Title;
                articles.Content = model.Content;

                _context.Update(articles);
                _context.SaveChanges();
                

                return RedirectToAction("Index");
            }
            return View(model);
        }

        // GET: Articles/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var articles = _context.Articles
                .Include(a => a.Author)
                .First(m => m.Id == id);

            if(IsUserAuthorizedToEdit(articles) == false)
            {
                return Forbid();
            }


            if (articles == null)
            {
                return NotFound();
            }

            return View(articles);
        }

        // POST: Articles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var articles = await _context.Articles.SingleOrDefaultAsync(m => m.Id == id);
            _context.Articles.Remove(articles);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ArticlesExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }

        private bool IsUserAuthorizedToEdit(Articles articles)
        {
            bool isAdmin = this.User.IsInRole("Admin");
            bool isAuthor = articles.IsAuthor(this.User.Identity.Name);

            return isAdmin || isAuthor;
        }
    }
}
