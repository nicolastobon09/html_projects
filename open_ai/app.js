"use strict";

function App() {
    var careers = function careers() {
        var request = new Request("https://boards-api.greenhouse.io/v1/boards/neuralink/jobs?content=true");
        fetch(request).then(function(response) {
            return response.json()
        }).then(function(response) {
            var careersListEl = document.querySelector(".careers.container");
            var removeDuplicates = function removeDuplicates(xs) {
                return Array.from(new Set(xs))
            };
            var departments = removeDuplicates(response.jobs.map(function(job) {
                return job.departments.map(function(x) {
                    return x.name
                })
            }).flat());
            var jobsByDepartment = departments.map(function(department) {
                return {
                    name: department,
                    jobs: response.jobs.filter(function(job) {
                        return job.departments.map(function(x) {
                            return x.name
                        }).includes(department)
                    })
                }
            });
            var jobHTMLBlock = function jobHTMLBlock(job) {
                return '\n          <a href="'.concat(job.absolute_url, '" target="_blank" class="careers-item">\n            <h2 class="careers-item-headline">').concat(job.title, '</h2>\n\n            <p class="careers-item-meta">\n              ').concat(job.location.name.replace(", United States", ""), '\n            </p>\n\n            <div class="careers-item-cta button -cta -color-dark" href="').concat(job.absolute_url, '">\n              Apply\n              <span class="arrowPacman">\n                <span class="arrowPacman-clip">\n                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"></path>\n                  </svg>\n                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"></path>\n                  </svg>\n                </span>\n              </span>\n            </div>\n          </a>\n        ')
            };
            var departmentHTMLBlock = function departmentHTMLBlock(department) {
                return '\n          <div class="careers-department">\n            <h3 class="careers-deparment-headline _top-border-headline">'.concat(department.name, "</h3>\n\n            ").concat(department.jobs.reduce(function(listing, job) {
                    return listing + jobHTMLBlock(job)
                }, ""), "\n          </div>\n        ")
            };
            jobsByDepartment.forEach(function(department) {
                careersListEl.insertAdjacentHTML("beforeend", departmentHTMLBlock(department))
            })
        })
    };
    var mobileNavigation = function mobileNavigation() {
        var hamburger = document.querySelector(".hamburger");
        var header = document.querySelector(".globalHeader");
        if (!hamburger || !header) return;
        hamburger.addEventListener("click", function(event) {
            var isMobile = window.matchMedia("(max-width: 768px)").matches;
            if (isMobile) {
                event.preventDefault();
                hamburger.classList.toggle("-active");
                document.documentElement.classList.toggle("-no-scroll");
                header.classList.toggle("-activeNav")
            }
        });
        window.addEventListener("resize", function() {
            hamburger.classList.remove("-active");
            header.classList.remove("-activeNav");
            document.documentElement.classList.remove("-no-scroll")
        })
    };
    var accordion = function accordion() {
        var items = document.querySelectorAll(".accordion-item");
        var active = "-active";
        if (!items) return;
        items.forEach(function(item) {
            item.addEventListener("click", function() {
                if (this.classList.contains(active)) {
                    this.classList.remove(active)
                } else {
                    var currentlySelected = document.querySelector(".accordion-item." + active);
                    currentlySelected && currentlySelected.classList.remove(active);
                    this.classList.add(active)
                }
            })
        })
    };
    var videoPopup = function videoPopup() {
        var popupLinks = document.querySelectorAll(".-openPopup");
        var popup = document.querySelector(".popupVideo");
        var videoElement = document.querySelector(".popupVideo video");
        var popupVideoElement = document.querySelector(".popupVideo source");
        var active = "-visible";
        if (!popupLinks) return;
        popupLinks.forEach(function(link) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                var videoFile = link.getAttribute("href");
                popupVideoElement.src = videoFile;
                videoElement.load();
                videoElement.play();
                popup.classList.add(active)
            })
        });
        document.querySelector(".popupVideo-close").addEventListener("click", function() {
            popup.classList.remove(active);
            videoElement.pause()
        })
    };
    var brain = function brain() {
        var element = "[data-brain-hover]";
        var triggers = document.querySelectorAll(element);
        var checkIfDesktop = window.matchMedia("(min-width: 768px)");
        var hoverInteraction = function hoverInteraction() {
            triggers.forEach(function(trigger) {
                trigger.addEventListener("mouseover", function(event) {
                    var target = event.target.closest(element).dataset.brainHover;
                    var highlight = document.querySelectorAll('svg [data-name="'.concat(target, '"] image'));
                    highlight.forEach(function(el) {
                        return el.style.opacity = 1
                    })
                });
                trigger.addEventListener("mouseout", function(event) {
                    var target = event.target.closest(element).dataset.brainHover;
                    var highlight = document.querySelectorAll('svg [data-name="'.concat(target, '"] image'));
                    highlight.forEach(function(el) {
                        return el.style.opacity = 0
                    })
                })
            })
        };
        var clickInteraction = function clickInteraction() {
            triggers.forEach(function(trigger) {
                trigger.addEventListener("click", function(event) {
                    var targetRegionName = event.target.closest(element).dataset.brainHover;
                    var targetRegionImage = document.querySelector('svg [data-name="'.concat(targetRegionName, '"] image'));
                    var currentlySelectedRegion = document.querySelector(".applicationsTwo-brains image.-active");
                    if (targetRegionImage.classList.contains("-active")) {
                        targetRegionImage.classList.remove("-active")
                    } else {
                        currentlySelectedRegion && currentlySelectedRegion.classList.remove("-active");
                        targetRegionImage.classList.add("-active")
                    }
                })
            })
        };
        if (triggers) {
            if (checkIfDesktop.matches) hoverInteraction();
            else clickInteraction()
        }
        checkIfDesktop.onchange = function() {
            if (triggers) {
                if (checkIfDesktop.matches) hoverInteraction();
                else clickInteraction()
            }
        }
    };
    var lazy = function lazy() {
        var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
        var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
        var IntersectionObserverOptions = {
            rootMargin: "1000px"
        };
        if ("IntersectionObserver" in window) {
            var lazyMediaObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var lazyMedia = entry.target;
                        if (entry.target.localName == "video") {
                            var source = Array.from(entry.target.children).filter(function(x) {
                                return x.localName === "source"
                            })[0];
                            source.src = source.dataset.src;
                            lazyMedia.load();
                            lazyMedia.play()
                        } else {
                            lazyMedia.src = lazyMedia.dataset.src
                        }
                        lazyMedia.classList.remove("lazy");
                        lazyMediaObserver.unobserve(lazyMedia)
                    }
                })
            }, IntersectionObserverOptions);
            lazyImages.forEach(function(lazyImage) {
                lazyMediaObserver.observe(lazyImage)
            });
            lazyVideos.forEach(function(lazyVideo) {
                lazyMediaObserver.observe(lazyVideo)
            })
        }
    };
    var science = function science() {
        function setHeight() {
            var illoVisible = window.matchMedia("(min-width: 1260px)").matches;
            var science = document.querySelector(".science");
            var scienceIllo = document.querySelector(".science svg").clientHeight;
            if (illoVisible) {
                science.style.height = "".concat(scienceIllo + 200, "px")
            } else {
                science.style.height = "initial"
            }
        }

        function tooltips() {
            var triggers = document.querySelectorAll("[data-target]");
            var figs = document.querySelectorAll(".fig");
            var active = "-visible";
            triggers.forEach(function(trigger) {
                trigger.addEventListener("mouseover", function(event) {
                    var target = event.target;
                    var element = target.dataset.target;
                    var selector = '[id^="'.concat(element, '-"]');
                    var elements = document.querySelectorAll(selector);
                    elements.forEach(function(el) {
                        return el.classList.add(active)
                    })
                });
                trigger.addEventListener("mouseout", function() {
                    var target = event.target;
                    var element = target.dataset.target;
                    var selector = '[id^="'.concat(element, '-"]');
                    var elements = document.querySelectorAll(selector);
                    elements.forEach(function(el) {
                        return el.classList.remove(active)
                    })
                })
            })
        }

        function init() {
            window.onload = setHeight;
            window.onresize = setHeight;
            window.onload = tooltips
        }
        return init()
    };
    var init = function init() {
        window.addEventListener("load", function() {
            lazy();
            mobileNavigation();
            accordion();
            videoPopup();
            brain();
            careers()
        })
    };
    return init()
}
window.addEventListener("load", new App);