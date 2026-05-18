import { use, useEffect, useState } from "react";
import { JobCard } from "../machine/JobCard";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { Job } from "@/store/jobs/jobs";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/jobs`);
      const data = response.data;
      setJobs(data.jobs);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.job_name?.toLowerCase().includes(term) ||
      job.job_number?.toLowerCase().includes(term)
    );
  });

  console.log(jobs);
  return (
    <div className="h-[700px] px-3 pt-5  ">
      <div className="flex flex-col h-full">
        <p className="px-2 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
          Un-Scheduled Jobs
        </p>
        <div className="px-2 mb-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search by name or job number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <ul className="space-y-0.5 flex flex-col gap-2 overflow-y-scroll h-full">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={job?.job_id}
              jobName={job?.job_name}
              deadline={
                job?.revised_delivery_date || job?.expected_delivery_date
              }
              job_number={job?.job_number}
              updated_at={job?.updated_at}
              created_at={job?.created_at}
              priority={job?.job_priority}
              run_order={job?.run_order}
              index={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
