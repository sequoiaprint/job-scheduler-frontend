import { use, useEffect, useState } from "react";
import { JobCard } from "../machine/JobCard";
import axios from "axios";
import { Job } from "../machine/MachineColumn";
import { API_BASE_URL } from "@/lib/config";

export function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/jobs`);
      const data = response.data;
      setJobs(data.jobs);
    };
    fetchJobs();
  }, []);

  console.log(jobs);
  return (
    <div className="h-[700px] px-3 pt-5  ">
      <div className="flex flex-col h-full">
        <p className="px-2 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
          Un-Scheduled Jobs
        </p>
        <ul className="space-y-0.5 flex flex-col gap-2 overflow-y-scroll h-full">
          {jobs.map((job, index) => (
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
